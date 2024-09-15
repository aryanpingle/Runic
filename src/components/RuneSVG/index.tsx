import "./index.css";

import { h, Component, VNode } from "preact";
import { Rune, RUNE_HEIGHT, RUNE_WIDTH } from "../Rune";
import {
    downloadSVGFromElement,
    sanitizeTextInput,
    textToBitmaskLines,
} from "./utils";
import { querySelectorArray } from "src/utils";

interface Props {
    interactive: boolean;
    displayPhonemes: boolean;
    phoneticText: string;
}

export interface RunicSVGStyles {
    runeColor: string;
    runeGuideColor: string;
    runeThickness: number;
    shadowSpread: number;
}

interface State {
    lines: number[][][];
}

const SVG_PADDING = 1;
const SPACE_WIDTH = RUNE_WIDTH;

export class RuneSVG extends Component<Props, State> {
    svgElement?: SVGElement;

    styles: RunicSVGStyles = {
        runeColor: "crimson",
        runeGuideColor: "transparent",
        runeThickness: 0.25,
        shadowSpread: 0,
    };

    componentDidUpdate() {
        this.applyStyles({});
    }

    componentDidMount() {
        this.applyStyles({});
    }

    applyStylesToGuideSegments() {
        // Rune segment guides
        querySelectorArray(
            ".rune-segments-guide > .rune-segment",
            this.svgElement,
        ).forEach((segment) => {
            segment.setAttribute("stroke", this.styles.runeGuideColor);
        });
    }

    applyStylesToActiveSegments() {
        // Active rune segments
        querySelectorArray(".rune-segment--active", this.svgElement).forEach(
            (segment) => {
                segment.setAttribute("stroke", this.styles.runeColor);
            },
        );
    }

    applyStyles = (newStyles: Partial<RunicSVGStyles>) => {
        Object.assign(this.styles, newStyles);

        // TODO: Refactor

        // General properties of rune segments
        querySelectorArray(".rune-segment", this.svgElement).forEach(
            (segment) => {
                segment.setAttribute("stroke", "transparent");
                segment.setAttribute(
                    "stroke-width",
                    `${this.styles.runeThickness}`,
                );
                segment.setAttribute("stroke-linecap", "round");
            },
        );

        this.applyStylesToGuideSegments();
        this.applyStylesToActiveSegments();

        // Drop Shadow
        const filter = this.styles.shadowSpread
            ? `drop-shadow(0 0 ${this.styles.shadowSpread}px ${this.styles.runeColor})`
            : "";
        this.svgElement.style.setProperty("filter", filter);
    };

    downloadSVG = () => {
        downloadSVGFromElement(this.svgElement);
    };

    constructor(props: Props) {
        super(props);
        this.renderPhoneticText(props.phoneticText);
    }

    public getRunes(): VNode<Rune>[] {
        const runesArray = [];

        this.state.lines.forEach((line, lineIndex) => {
            let tx = 0;
            line.forEach((word) => {
                word.forEach((bitmask) => {
                    const ty = lineIndex * (RUNE_HEIGHT + SVG_PADDING);
                    const transformation = `translate(${tx}, ${ty})`;
                    runesArray.push(
                        <Rune
                            displayPhonemes={this.props.displayPhonemes}
                            interactive={this.props.interactive}
                            bitmask={bitmask}
                            transform={transformation}
                        ></Rune>,
                    );
                    tx += RUNE_WIDTH;
                });

                // Space after a word
                tx += SPACE_WIDTH;
            });
        });

        return runesArray;
    }

    private getViewBoxDimensions(): [number, number] {
        const ACTUAL_RUNE_HEIGHT =
            RUNE_HEIGHT - (this.props.displayPhonemes ? 0 : 1);

        // Calculate maximum width among the lines
        let maxLineWidth = 0;
        this.state.lines.forEach((line) => {
            let lineWidth = 0;
            // Add rune widths
            line.forEach((word) => {
                lineWidth += word.length * RUNE_WIDTH;
            });
            // Add spacing between words
            const numWords = line.length - 1;
            lineWidth += numWords * SPACE_WIDTH;

            // Add width of runes
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        });
        // Padding on either side + max line width
        const SVG_VIEWBOX_WIDTH = 2 * SVG_PADDING + maxLineWidth;

        const NUM_LINES = this.state.lines.length;
        const SVG_VIEWBOX_HEIGHT =
            2 * SVG_PADDING + // Padding on either side
            ACTUAL_RUNE_HEIGHT * NUM_LINES + // Height of all lines
            (NUM_LINES - 1) * (RUNE_WIDTH / 2); // Spacing between lines

        return [SVG_VIEWBOX_WIDTH, SVG_VIEWBOX_HEIGHT];
    }

    renderPhoneticText(phoneticText: string) {
        const sanitized = sanitizeTextInput(phoneticText);

        this.setState({
            lines: textToBitmaskLines(sanitized),
        });
    }

    render(props: Props, state: State) {
        // Magic number because I'm a wizard
        // TODO: Put this in a better place
        const SCALING_FACTOR = 100;

        const [viewBoxWidth, viewBoxHeight] = this.getViewBoxDimensions();
        const viewBox = `-${SVG_PADDING} -${SVG_PADDING} ${viewBoxWidth} ${viewBoxHeight}`;
        return (
            <svg
                ref={(e) => {
                    this.svgElement = e;
                }}
                class="runic-svg"
                width={viewBoxWidth * SCALING_FACTOR}
                height={viewBoxHeight * SCALING_FACTOR}
                viewBox={viewBox}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                {...this.getRunes()}
            </svg>
        );
    }
}
