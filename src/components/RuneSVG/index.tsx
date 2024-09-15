import "./index.css";

import { h, Component, VNode } from "preact";
import { Rune, RUNE_HEIGHT, RUNE_WIDTH } from "../Rune";
import { sanitizeTextInput, textToBitmaskLines } from "./utils";

interface Props {
    interactive: boolean;
    displayPhonemes: boolean;
    phoneticText: string;
}

interface State {
    lines: number[][][];
}

const SVG_PADDING = 1;
const SPACE_WIDTH = RUNE_WIDTH;

export class RuneSVG extends Component<Props, State> {
    svgElement?: SVGElement;

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

    render(props: Props, { lines }: State) {
        const [viewBoxWidth, viewBoxHeight] = this.getViewBoxDimensions();
        const viewBox = `-${SVG_PADDING} -${SVG_PADDING} ${viewBoxWidth} ${viewBoxHeight}`;
        return (
            <svg
                ref={(e) => {
                    this.svgElement = e;
                }}
                class="runic-svg"
                width={viewBoxWidth}
                height={viewBoxHeight}
                viewBox={viewBox}
            >
                {...this.getRunes()}
            </svg>
        );
    }
}
