import { h, Component, VNode, JSX } from "preact";
import { getInfoFromRuneMask } from "../../rune";
import { symbolToSymbolData } from "../../runeDataset";

interface Props extends JSX.SVGAttributes {
    bitmask: number;
}

interface State {
    bitmask: number;
}

type Point = [number, number];

export const RUNE_WIDTH = 3;
export const RUNE_HEIGHT = 8;

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

export class Rune extends Component<Props, State> {
    state: State = {
        bitmask: 0,
    };

    element?: SVGElement;

    toggleBit(index: number) {
        const bitmask = this.state.bitmask;
        this.setState({
            bitmask: bitmask ^ (1 << (14 - index)),
        });
    }

    getRuneLine(index: number, active: boolean): VNode<SVGLineElement> {
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

    getRuneUnderring(active: boolean): VNode<SVGCircleElement> {
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

    componentDidMount(): void {
        this.element.querySelectorAll(".rune-segment").forEach((segment) => {
            const index = parseInt(segment.getAttribute("data-segment-index"));
            segment.addEventListener("click", (event) => {
                this.toggleBit(index);
            });
        });
    }

    getRuneSegments(bitmask: number): VNode<SVGElement>[] {
        // Takes up a rect of (width, height) = (3, 7)

        const lines = lineCoords.map((_, lineIndex) => {
            const active = (bitmask & (1 << (14 - lineIndex))) !== 0;
            return this.getRuneLine(lineIndex, active);
        });

        const isUnderringActive = (bitmask & (1 << 0)) !== 0;
        const underring = this.getRuneUnderring(isUnderringActive);

        const segments = [...lines, underring];
        return segments;
    }

    constructor(props: Props) {
        super(props);

        this.state.bitmask = props.bitmask;
    }

    render(props: Props, state: State) {
        const { bitmask, ...attrs } = props;

        const { vowel, consonant, vowelBeforeConsonant } = getInfoFromRuneMask(
            this.state.bitmask,
        );
        let arr = [consonant, vowel];
        if (vowelBeforeConsonant) {
            arr.reverse();
        }
        const translation = arr.join(" ").trim();
        const pronunciation = translation
            .split(" ")
            .map((s) => symbolToSymbolData[s].english)
            .join(", ");

        return (
            // TODO: ref function
            <g
                class="rune"
                ref={(e) => {
                    this.element = e;
                }}
                {...(attrs as any)}
            >
                <g class="rune-segments-guide">{...this.getRuneSegments(0)}</g>
                <g class="rune-segments-actual">
                    {...this.getRuneSegments(state.bitmask)}
                </g>
                <g class="rune-segments-hover">{...this.getRuneSegments(0)}</g>
                <text
                    font-size={1}
                    fill={"white"}
                    x={1.5}
                    y={8}
                    text-anchor={"middle"}
                    title={pronunciation}
                >
                    {translation}
                </text>
            </g>
        );
    }
}
