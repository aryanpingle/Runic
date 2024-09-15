//////////////////// From Rune/index.tsx

import { VNode } from "preact";
import { getInfoFromRuneMask } from "src/rune";

type Point = [number, number];

export const RUNE_WIDTH = 3;
export const RUNE_HEIGHT = 8;

export const RUNE_SPACE_WIDTH = RUNE_WIDTH;
export const RUNE_LINE_SPACING = RUNE_WIDTH;

// prettier-ignore
const lineCoords: [Point, Point][] = [
    [[0, 3], [3, 3]], // line 0
    [[1.5, 0], [3, 1]], // line 1
    [[3, 5], [1.5, 6]], // line 2
    [[1.5, 6], [0, 5]], // line 3
    [[0, 5], [0, 4]], // line 4
    [[0, 3], [0, 1]], // line 5
    [[0, 1], [1.5, 0]], // line 6
    [[1.5, 0], [1.5, 2]], // line 7
    [[3, 1], [1.5, 2]], // line 8
    [[1.5, 4], [3, 5]], // line 9
    [[1.5, 4], [1.5, 6]], // line 10
    [[1.5, 4], [0, 5]], // line 11
    [[1.5, 2], [0, 1]], // line 12
    [[1.5, 2], [1.5, 3]], // line 13
];

function getRuneLine(index: number, active: boolean): VNode<SVGLineElement> {
    const p1 = lineCoords[index][0];
    const p2 = lineCoords[index][1];
    return (
        <line
            class={`rune-segment ${active ? "rune-segment--active" : ""}`}
            data-segment-index={index}
            x1={p1[0]}
            y1={p1[1]}
            x2={p2[0]}
            y2={p2[1]}
        ></line>
    );
}

function getRuneUnderring(active: boolean): VNode<SVGCircleElement> {
    return (
        <circle
            class={`rune-segment ${active ? "rune-segment--active" : ""}`}
            data-segment-index={14}
            cx={1.5}
            cy={6.5}
            r={0.5}
            fill="none"
        ></circle>
    );
}

function getRuneSegments(bitmask: number): VNode<SVGElement>[] {
    // Takes up a rect of (width, height) = (3, 7)

    const lines = lineCoords.map((_, lineIndex) => {
        const active = (bitmask & (1 << (14 - lineIndex))) !== 0;
        return getRuneLine(lineIndex, active);
    });

    const isUnderringActive = (bitmask & 1) !== 0;
    const underring = getRuneUnderring(isUnderringActive);
    const segments = [...lines, underring];
    return segments;
}

/////////// Custom helpers

export interface RuneLayers {
    guide: VNode<RuneSegmentsContainer>[];
    real: VNode<RuneSegmentsContainer>[];
    interactive: VNode<RuneSegmentsContainer>[];
    text: VNode<RuneSegmentsContainer>[];
}

export function getRuneLayers(lines: number[][][]): RuneLayers {
    const layers: RuneLayers = {
        guide: [],
        real: [],
        interactive: [],
        text: [],
    };

    let index = 0;
    lines.forEach((line, lineIndex) => {
        const runeY = lineIndex * (RUNE_HEIGHT + RUNE_LINE_SPACING);
        let runeX = 0;
        line.map((word) => {
            word.forEach((bitmask) => {
                const { guide, real, interactive, text } =
                    getRuneLayersForOneRune(bitmask, index, runeX, runeY);

                // Add the rune containers to their respective layers
                layers.guide.push(...guide);
                layers.real.push(...real);
                layers.interactive.push(...interactive);
                layers.text.push(...text);

                // Increment the number of runes so far
                ++index;
                // Add rune width
                runeX += RUNE_WIDTH;
            });
            runeX += RUNE_SPACE_WIDTH;
        });
    });

    return layers;
}

type RuneSegmentsContainer = SVGGElement;

function getRuneLayersForOneRune(
    bitmask: number,
    index: number,
    tx: number,
    ty: number,
): RuneLayers {
    const runeTranslation = `translate(${tx}, ${ty})`;

    // Guide Layer
    const guideLayer = (
        <g className="rune" data-rune-index={index} transform={runeTranslation}>
            {...getRuneSegments(0)}
        </g>
    );

    // Real Layer
    const realLayer = (
        <g className="rune" data-rune-index={index} transform={runeTranslation}>
            {...getRuneSegments(bitmask)}
        </g>
    );

    // Interactive Layer
    const interactiveLayer = (
        <g
            className="rune"
            data-rune-bitmask={bitmask.toString(2)}
            data-rune-index={index}
            transform={runeTranslation}
        >
            {...getRuneSegments(0)}
        </g>
    );

    // Text Layer
    const { vowel, consonant, vowelBeforeConsonant } =
        getInfoFromRuneMask(bitmask);
    let arr = [consonant, vowel];
    if (vowelBeforeConsonant) {
        arr.reverse();
    }
    const translation = arr.join(" ").trim();
    const textLayer = (
        <g className="rune" data-rune-index={index} transform={runeTranslation}>
            <text
                font-size={1}
                fill={"white"}
                x={1.5}
                y={8}
                text-anchor={"middle"}
            >
                {translation}
            </text>
        </g>
    );

    return {
        guide: [guideLayer],
        real: [realLayer],
        interactive: [interactiveLayer],
        text: [textLayer],
    };
}
