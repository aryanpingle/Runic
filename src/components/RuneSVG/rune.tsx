import { VNode } from "preact";
import { getInfoFromRuneMask } from "src/rune";

type Point = [number, number];

export const RUNE_WIDTH = 3;
export const RUNE_HEIGHT_WITH_TEXT = 8;
export const TEXT_HEIGHT = 1;

export const RUNE_SPACE_WIDTH = RUNE_WIDTH;
export const RUNE_LINE_SPACING = RUNE_WIDTH / 2;

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

export interface RuneLayers {
    guide: VNode<RuneSegmentsContainer>[];
    real: VNode<RuneSegmentsContainer>[];
    interactive: VNode<RuneSegmentsContainer>[];
    text: VNode<RuneSegmentsContainer>[];
}

type RuneSegmentsContainer = SVGGElement;

export function getRuneLayersForOneRune(
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
                alignment-baseline={"middle"}
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
