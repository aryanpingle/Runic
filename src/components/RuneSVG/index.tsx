import "./index.css";

import { h, Component } from "preact";
import { sanitizeTextInput, textToBitmaskLines } from "./utils";
import {
    RUNE_HEIGHT,
    RUNE_LINE_SPACING,
    RUNE_SPACE_WIDTH,
    RUNE_WIDTH,
    getRuneLayers,
} from "./rune";

interface Props {
    interactive: boolean;
    displayPhonemes: boolean;
    phoneticText: string;

    styles?: Partial<RunicSVGStyles>;
}

export interface RunicSVGStyles {
    runeColor: string;
    runeGuideColor: string;
    runeThickness: number;
    shadowSpread: number;
}

interface State {}

const SVG_PADDING = 1;

export class RuneSVG extends Component<Props, State> {
    svgElement?: SVGElement;

    lines: number[][][];

    // The 4 layers
    guideLayer?: SVGGElement;
    realLayer?: SVGGElement;
    interactiveLayer?: SVGGElement;
    textLayer?: SVGGElement;

    styles: RunicSVGStyles = {
        runeColor: "crimson",
        runeGuideColor: "transparent",
        runeThickness: 0.25,
        shadowSpread: 0,
    };

    constructor(props: Props) {
        super(props);

        // Set default styles (if any) from props
        Object.assign(this.styles, props.styles || {});

        this.renderPhoneticText(props.phoneticText);
    }

    // --- Life Cycle Methods

    componentDidUpdate() {
        this.applyStyles({});
    }

    componentDidMount() {
        this.applyStyles({});
    }

    // --- Apply SVG-level styles

    public applyStyles = (newStyles: Partial<RunicSVGStyles>) => {
        Object.assign(this.styles, newStyles);

        // Apply styles to rune segments
        this.applyGeneralStylesToSegments();
        this.applyStylesToGuideSegments();
        this.applyStylesToRealSegments();
        this.applyStylesToInteractiveSegments();

        // Apply styles to the SVG
        this.applyGeneralSVGStyles();
    };

    private applyGeneralSVGStyles() {
        // Drop Shadow
        const filter = this.styles.shadowSpread
            ? `drop-shadow(0 0 ${this.styles.shadowSpread}px ${this.styles.runeColor})`
            : "";
        this.svgElement.style.setProperty("filter", filter);
    }

    private applyGeneralStylesToSegments() {
        // General properties of rune segments
        this.svgElement.querySelectorAll(".rune-segment").forEach((segment) => {
            // Make every segment transparent by default
            segment.setAttribute("stroke", "transparent");
            // Set a common stroke-width
            segment.setAttribute(
                "stroke-width",
                `${this.styles.runeThickness}`,
            );
            // Make every line have rounded ends
            segment.setAttribute("stroke-linecap", "round");
        });
    }

    private applyStylesToGuideSegments() {
        // Guide layer segments
        this.guideLayer
            ?.querySelectorAll(".rune-segment")
            .forEach((segment) => {
                segment.setAttribute("stroke", this.styles.runeGuideColor);
            });
    }

    private applyStylesToRealSegments() {
        // Real layer segments
        this.realLayer
            ?.querySelectorAll(".rune-segment--active")
            .forEach((segment) => {
                segment.setAttribute("stroke", this.styles.runeColor);
            });
    }

    private applyStylesToInteractiveSegments() {
        // Interactive layer segments

        // Apply onclick if it hasn't already been applied
        const onclickCertificate = "CUM";
        this.interactiveLayer
            ?.querySelectorAll(".rune-segment")
            .forEach((segment) => {
                if (segment.hasAttribute(onclickCertificate)) return;

                segment.addEventListener(
                    "click",
                    this.onInteractiveSegmentClick,
                );
                segment.setAttribute(onclickCertificate, "true");
            });
    }

    // --- Listener

    private onInteractiveSegmentClick = (event: Event) => {
        const segment = event.currentTarget as SVGElement;
        const runeContainer = segment.parentElement;

        // Extract information from the segment and its .rune parent
        const runeIndex = parseInt(
            runeContainer.getAttribute("data-rune-index"),
        );
        const bitmask = parseInt(
            runeContainer.getAttribute("data-rune-bitmask"),
            2,
        );
        const segmentIndex = parseInt(
            segment.getAttribute("data-segment-index"),
        );

        // Calculate the new bitmask after toggling
        const newBitmask = bitmask ^ (1 << (14 - segmentIndex));

        this.updateIndividualRune(newBitmask, runeIndex);
        this.forceUpdate();
    };

    updateIndividualRune(bitmask: number, runeIndex: number) {
        let counter = 0;
        for (const line of this.lines) {
            for (const word of line) {
                for (let i = 0; i < word.length; ++i) {
                    if (counter === runeIndex) {
                        word[i] = bitmask;
                        return;
                    }
                    ++counter;
                }
            }
        }
    }

    // --- Creating the SVG

    public renderPhoneticText(phoneticText: string) {
        const sanitized = sanitizeTextInput(phoneticText);
        this.lines = textToBitmaskLines(sanitized);
    }

    private getViewBoxDimensions(): [number, number] {
        const ACTUAL_RUNE_HEIGHT =
            RUNE_HEIGHT - (this.props.displayPhonemes ? 0 : 1);

        // Calculate maximum width among the lines
        let maxLineWidth = 0;
        this.lines.forEach((line) => {
            let lineWidth = 0;
            // Add rune widths
            line.forEach((word) => {
                lineWidth += word.length * RUNE_WIDTH;
            });
            // Add spacing between words
            const numWords = line.length - 1;
            lineWidth += numWords * RUNE_SPACE_WIDTH;

            // Add width of runes
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        });
        // Padding on either side + max line width
        const SVG_VIEWBOX_WIDTH = 2 * SVG_PADDING + maxLineWidth;

        const NUM_LINES = this.lines.length;
        const SVG_VIEWBOX_HEIGHT =
            2 * SVG_PADDING + // Padding on either side
            ACTUAL_RUNE_HEIGHT * NUM_LINES + // Height of all lines
            (NUM_LINES - 1) * RUNE_LINE_SPACING; // Spacing between lines

        return [SVG_VIEWBOX_WIDTH, SVG_VIEWBOX_HEIGHT];
    }

    render(props: Props, state: State) {
        // Magic number because I'm a wizard
        // TODO: Put this in a better place
        const SCALING_FACTOR = 100;

        const [viewBoxWidth, viewBoxHeight] = this.getViewBoxDimensions();
        const viewBox = `-${SVG_PADDING} -${SVG_PADDING} ${viewBoxWidth} ${viewBoxHeight}`;

        const layers = getRuneLayers(this.lines, this.props.displayPhonemes);
        return (
            <svg
                ref={(e) => {
                    this.svgElement = e;
                }}
                class="runic-svg"
                // width={viewBoxWidth * SCALING_FACTOR}
                // height={viewBoxHeight * SCALING_FACTOR}
                viewBox={viewBox}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <g
                    ref={(e) => (this.guideLayer = e)}
                    className="runic-layer--guide"
                >
                    {...layers.guide}
                </g>
                <g
                    ref={(e) => (this.realLayer = e)}
                    className="runic-layer--real"
                >
                    {...layers.real}
                </g>
                {props.interactive && (
                    <g
                        ref={(e) => (this.interactiveLayer = e)}
                        className="runic-layer--interactive"
                    >
                        {...layers.interactive}
                    </g>
                )}
                {props.displayPhonemes && (
                    <g
                        ref={(e) => (this.textLayer = e)}
                        className="runic-layer--text"
                    >
                        {...layers.text}
                    </g>
                )}
            </svg>
        );
    }
}
