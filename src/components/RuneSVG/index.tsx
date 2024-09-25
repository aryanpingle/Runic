import "./index.css";

import { h, Component } from "preact";
import {
    RUNE_HEIGHT_WITH_TEXT,
    TOKEN_WIDTH,
    RuneLayers,
    TEXT_HEIGHT,
    getRuneLayersForOneRune,
    appendLayers,
    renderSpecialCharacter,
} from "./rune";
import {
    getLineTokenCounts,
    parseString,
    RenderableToken,
    splitTokensIntoLines,
} from "./tokenizer";
import { bitmaskToRuneToken, getRuneBitmask } from "./utils";
import { sanitizeBitmask } from "src/rune";

export interface Props extends Partial<StateInProps> {
    interactive: boolean;
    phoneticText: string;
}

interface StateInProps {
    displayPhonemes: boolean;
    backgroundColor: string;
    transparentBackground: boolean;
    runeColor: string;
    runeGuideColor: string;
    runeThickness: number;
    shadowSpread: number;
    align: "left" | "center" | "right";
    lineSpacing: number;
}

interface State extends StateInProps {}

const SVG_PADDING = 2;

export class RuneSVG extends Component<Props, State> {
    svgElement?: SVGElement;

    tokens: RenderableToken[];

    // Initial state based on props
    state: State = {
        displayPhonemes: this.props.displayPhonemes ?? false,
        backgroundColor: this.props.backgroundColor ?? "transparent",
        transparentBackground: this.props.transparentBackground ?? true,
        runeColor: this.props.runeColor ?? "crimson",
        runeGuideColor: this.props.runeGuideColor ?? "transparent",
        runeThickness: this.props.runeThickness ?? 0.25,
        shadowSpread: this.props.shadowSpread ?? 0,
        align: this.props.align ?? "left",
        lineSpacing: this.props.lineSpacing ?? TOKEN_WIDTH / 2,
    };

    // The 4 layers
    private guideLayer?: SVGGElement;
    private realLayer?: SVGGElement;
    private interactiveLayer?: SVGGElement;
    private textLayer?: SVGGElement;

    // --- Life Cycle Methods

    constructor(props: Props) {
        super(props);

        this.tokens = parseString(props.phoneticText);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>): void {
        if(nextProps.phoneticText !== this.props.phoneticText) {
            this.tokens = parseString(nextProps.phoneticText);
        }
    }
    
    componentDidUpdate() {
        this.postRenderSetup();
    }

    componentDidMount() {
        this.postRenderSetup();
    }

    // --- Apply SVG-level styles

    public postRenderSetup = () => {
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
        const filter = this.state.shadowSpread
            ? `drop-shadow(0 0 ${this.state.shadowSpread}px ${this.state.runeColor})`
            : "";
        this.svgElement.style.setProperty("filter", filter);
    }

    private applyGeneralStylesToSegments() {
        // General properties of rune segments
        this.svgElement.querySelectorAll(".rune-segment").forEach((segment) => {
            // Make every segment transparent by default
            segment.setAttribute("stroke", "transparent");
            // Set a common stroke-width
            segment.setAttribute("stroke-width", `${this.state.runeThickness}`);
            // Make every line have rounded ends
            segment.setAttribute("stroke-linecap", "round");
        });
    }

    private applyStylesToGuideSegments() {
        // Guide layer segments
        this.guideLayer
            ?.querySelectorAll(".rune-segment")
            .forEach((segment) => {
                segment.setAttribute("stroke", this.state.runeGuideColor);
            });
    }

    private applyStylesToRealSegments() {
        // Real layer segments
        this.realLayer
            ?.querySelectorAll(".rune-segment--active")
            .forEach((segment) => {
                // Fuck you, React. Let me explain -
                // Sometimes a component is "reused" thanks to the
                // diffing algorithm. So if it had a fill, and now it must
                // have a stroke, the fill may not be removed.
                // Hence, this bullshittery is 100% necessary.
                const shouldStroke = segment.classList.contains(
                    "rune-segment--stroke",
                );
                segment.setAttribute(
                    "stroke",
                    shouldStroke ? this.state.runeColor : "none",
                );
                const shouldFill =
                    segment.classList.contains("rune-segment--fill");
                segment.setAttribute(
                    "fill",
                    shouldFill ? this.state.runeColor : "none",
                );
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
        const tokenIndex = parseInt(
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
        const toggledBitmask = bitmask ^ (1 << (14 - segmentIndex));
        const newBitmask = sanitizeBitmask(toggledBitmask, bitmask);

        this.updateRuneTokenMask(tokenIndex, newBitmask);
    };

    updateRuneTokenMask(tokenIndex: number, newBitmask: number) {
        const newToken = bitmaskToRuneToken(newBitmask);
        this.tokens[tokenIndex] = newToken;
        this.forceUpdate();
    }

    // --- Creating the SVG

    private getViewBoxDimensions(): [number, number] {
        const ACTUAL_RUNE_HEIGHT =
            RUNE_HEIGHT_WITH_TEXT -
            (this.state.displayPhonemes ? 0 : TEXT_HEIGHT);

        const lines = splitTokensIntoLines(this.tokens);
        const maxLineWidth =
            Math.max(...lines.map((tokens) => tokens.length)) * TOKEN_WIDTH;

        // Padding on either side + max line width
        const SVG_VIEWBOX_WIDTH = 2 * SVG_PADDING + maxLineWidth;

        const NUM_LINES = lines.length;
        const SVG_VIEWBOX_HEIGHT =
            2 * SVG_PADDING + // Padding on either side
            ACTUAL_RUNE_HEIGHT * NUM_LINES + // Height of all lines
            (NUM_LINES - 1) * this.state.lineSpacing; // Spacing between lines

        return [SVG_VIEWBOX_WIDTH, SVG_VIEWBOX_HEIGHT];
    }

    getAlignmentOffset(lineWidth: number, maxLineWidth: number): number {
        let alignmentOffset = 0;
        if (this.state.align === "left") {
            // noop
        } else if (this.state.align === "center") {
            alignmentOffset = (maxLineWidth - lineWidth) / 2;
        } else if (this.state.align === "right") {
            alignmentOffset = maxLineWidth - lineWidth;
        }
        return alignmentOffset;
    }

    getTokenLayers(tokens: RenderableToken[]): RuneLayers {
        const layers: RuneLayers = {
            guide: [],
            real: [],
            interactive: [],
            text: [],
        };

        const ACTUAL_RUNE_HEIGHT =
            RUNE_HEIGHT_WITH_TEXT -
            (this.state.displayPhonemes ? 0 : TEXT_HEIGHT);

        // We'll need this to apply the alignment
        const lineTokenCounts = getLineTokenCounts(tokens);
        const maxLineWidth = Math.max(
            ...lineTokenCounts.map((count) => count * TOKEN_WIDTH),
        );

        let lineIndex = 0;
        let lineTokenIndex = 0;
        tokens.forEach((token, tokenIndex) => {
            const runeY =
                lineIndex * (ACTUAL_RUNE_HEIGHT + this.state.lineSpacing);

            const alignmentOffset = this.getAlignmentOffset(
                lineTokenCounts[lineIndex] * TOKEN_WIDTH,
                maxLineWidth,
            );

            const runeX = alignmentOffset + lineTokenIndex * TOKEN_WIDTH;
            ++lineTokenIndex;

            if (token.type === "specialChar" && token.char === "\n") {
                // If newline
                ++lineIndex;
                lineTokenIndex = 0;
            } else if (token.type === "specialChar") {
                // Any other special character
                const special = renderSpecialCharacter(
                    token.char,
                    runeX,
                    runeY,
                );
                layers.real.push(special as any);
            } else {
                // Add layers of this phonetic token
                const runeBitmask = getRuneBitmask(token);
                const runeLayers = getRuneLayersForOneRune(
                    runeBitmask,
                    tokenIndex,
                    runeX,
                    runeY,
                );
                appendLayers(layers, runeLayers);
            }
        });

        return layers;
    }

    public setPhoneticText(phoneticText: string) {
        this.tokens = parseString(phoneticText);
        this.forceUpdate();
    }

    render(props: Props, state: State) {
        const tokenLayers = this.getTokenLayers(this.tokens);

        // Calculate viewbox
        const [viewBoxWidth, viewBoxHeight] = this.getViewBoxDimensions();
        const viewBox = [
            -SVG_PADDING,
            -SVG_PADDING,
            viewBoxWidth,
            viewBoxHeight,
        ].join(" ");

        return (
            <svg
                ref={(e) => (this.svgElement = e)}
                class="runic-svg"
                preserveAspectRatio="xMidYMid meet"
                viewBox={viewBox}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <g
                    ref={(e) => (this.guideLayer = e)}
                    className="runic-layer--guide"
                >
                    {...tokenLayers.guide}
                </g>
                <g
                    ref={(e) => (this.realLayer = e)}
                    className="runic-layer--real"
                >
                    {...tokenLayers.real}
                </g>
                {props.interactive && (
                    <g
                        ref={(e) => (this.interactiveLayer = e)}
                        className="runic-layer--interactive"
                    >
                        {...tokenLayers.interactive}
                    </g>
                )}
                {state.displayPhonemes && (
                    <g
                        ref={(e) => (this.textLayer = e)}
                        className="runic-layer--text"
                    >
                        {...tokenLayers.text}
                    </g>
                )}
            </svg>
        );
    }
}
