import "./index.css";

import { h, Component, VNode } from "preact";
import { RuneSVG } from "components/RuneSVG";
import { translateSentence } from "src/ipa";
import { RangeInput } from "components/RangeInput";
import {
    downloadURI,
    drawSVGToCanvas,
    svgToImageBlob,
    svgToUri,
} from "./utils";
import {
    CenterAlignIcon,
    CopyIcon,
    DownloadIcon,
    LeftAlignIcon,
    RightAlignIcon,
    ShareIcon,
} from "components/icons";
import { ChipSelect } from "components/ChipSelect";
import { ColorInput } from "components/ColorInput";
import { TOKEN_WIDTH } from "components/RuneSVG/rune";
import { TextInput } from "components/TextInput";

interface Props {}

interface State {}

/**
 * Get all interactive settings for the Runic Editor.
 */
function getSettings(obj: RunicEditor): VNode {
    const AlignmentSelect = (
        <ChipSelect
            chipData={[
                {
                    value: "left",
                    label: <LeftAlignIcon width="1.25em" height="1.25em" />,
                },
                {
                    value: "center",
                    label: <CenterAlignIcon width="1.25em" height="1.25em" />,
                },
                {
                    value: "right",
                    label: <RightAlignIcon width="1.25em" height="1.25em" />,
                },
            ]}
            onChange={obj.onAlignmentChange}
        />
    );
    const PhonemeSelect = (
        <ChipSelect
            chipData={[
                { value: "false", label: "Hide phonemes" },
                { value: "true", label: "Show phonemes" },
            ]}
            onChange={obj.onPhonemeDisplayChange}
        />
    );
    const TransparencySelect = (
        <ChipSelect
            chipData={[
                { value: "true", label: "Transparent background" },
                { value: "false", label: "Opaque background" },
            ]}
            onChange={obj.onTransparentBackgroundSelect}
        />
    );
    return (
        <div className="runic-editor__settings-container">
            <RangeInput
                label={"Thickness"}
                min={0.05}
                max={0.5}
                step={0.01}
                default={0.25}
                bindInput={obj.onThicknessChange}
            ></RangeInput>
            <RangeInput
                label={"Glow Effect"}
                min={0}
                max={20}
                step={0.5}
                default={0}
                bindInput={obj.onSpreadChange}
            ></RangeInput>
            <RangeInput
                label={"Line Height"}
                min={-TOKEN_WIDTH}
                max={TOKEN_WIDTH}
                step={0.5}
                default={TOKEN_WIDTH / 2}
                bindInput={obj.onLineSpacingChange}
            ></RangeInput>
            {AlignmentSelect}
            {PhonemeSelect}
            <ColorInput
                defaultColor="crimson"
                bindInput={obj.onRuneColorChange}
                label="Rune Color"
            />
            <ColorInput
                defaultColor="black"
                bindInput={obj.onBackgroundChange}
                label="Background"
            />
            {TransparencySelect}
            <div className="runic-editor__download-group">
                <button
                    className="runic-editor__download-button"
                    onClick={() => obj.download("svg")}
                >
                    <DownloadIcon /> SVG
                </button>
                <button
                    className="runic-editor__download-button"
                    onClick={() => obj.download("png")}
                >
                    <DownloadIcon /> PNG
                </button>
                <button
                    className="runic-editor__download-button"
                    onClick={() => obj.download("jpeg")}
                >
                    <DownloadIcon /> JPEG
                </button>
            </div>
            <div className="runic-editor__download-group">
                <button
                    className="runic-editor__download-button"
                    onClick={() => obj.copyAsPNG()}
                >
                    <CopyIcon /> Copy
                </button>
                <button
                    className="runic-editor__download-button"
                    onClick={() => obj.sharePNG()}
                >
                    <ShareIcon /> Share
                </button>
            </div>
        </div>
    );
}

const initialEnglishText = "Tunic\nSecret Legend!";
const initialPhoneticText = "tunɪk\nsikɹət ɫɛdʒənd!";

export class RunicEditor extends Component<Props, State> {
    runeSVGElement?: RuneSVG;
    svgContainer?: HTMLElement;
    englishInput?: TextInput;
    phoneticInput?: TextInput;

    componentDidMount(): void {}

    // Listeners

    onPhoneticChange = (phoneticText: string) => {
        this.runeSVGElement.setPhoneticText(phoneticText);
    };

    onEnglishChange = (englishText: string) => {
        const phoneticText = translateSentence(englishText);
        // Update the phonetic text input
        this.phoneticInput.setText(phoneticText);
    };

    onSpreadChange = (spread: number) => {
        this.runeSVGElement.setState({ shadowSpread: spread });
    };

    onThicknessChange = (thickness: number) => {
        this.runeSVGElement.setState({ runeThickness: thickness });
    };

    onLineSpacingChange = (lineSpacing: number) => {
        this.runeSVGElement.setState({ lineSpacing: lineSpacing });
    };

    onAlignmentChange = (align: "left" | "center" | "right") => {
        this.runeSVGElement.setState({ align: align });
    };

    onPhonemeDisplayChange = (display: "false" | "true") => {
        this.runeSVGElement.setState({ displayPhonemes: display === "true" });
    };

    onRuneColorChange = (color: string) => {
        this.runeSVGElement.setState({ runeColor: color });
    };

    onBackgroundChange = (color: string) => {
        this.runeSVGElement.setState({ backgroundColor: color });
        this.svgContainer.style.setProperty("background-color", color);
    };

    onTransparentBackgroundSelect = (enableTransparency: string) => {
        const shouldEnable = enableTransparency == "true";
        this.runeSVGElement.setState({ transparentBackground: shouldEnable });
        this.svgContainer.style.setProperty(
            "background-image",
            shouldEnable ? "" : "none",
        );
    };

    copyAsPNG = async () => {
        this.usePreparedSVG(async (svgElement: SVGElement) => {
            const blob = await svgToImageBlob(svgElement);

            await navigator.clipboard.write?.([
                new ClipboardItem({
                    "image/png": blob,
                }),
            ]);
        });
    };

    sharePNG = async () => {
        this.usePreparedSVG(async (svgElement: SVGElement) => {
            const blob = await svgToImageBlob(svgElement);

            const file = new File([blob], "rune.png", {
                lastModified: Date.now(),
                type: "image/png",
            });

            const shareData: ShareData = {
                files: [file],
            };

            if (navigator.canShare?.(shareData)) {
                navigator.share(shareData);
            }
        });
    };

    usePreparedSVG = (callback: (svgElement: SVGElement) => void) => {
        const svgElement = this.runeSVGElement.svgElement;

        // Add background color (only if transparentBackground is disabled)
        if (!this.runeSVGElement.state.transparentBackground) {
            const backgroundColor = this.runeSVGElement.state.backgroundColor;
            svgElement.style.setProperty("background-color", backgroundColor);
        }

        callback(svgElement);

        // Remove background color
        svgElement.style.removeProperty("background-color");
    };

    // Miscellaneous

    download = async (format: "svg" | "png" | "jpeg") => {
        this.usePreparedSVG(async (svgElement: SVGElement) => {
            const filename = "rune";
            if (format === "svg") {
                const uri = svgToUri(svgElement);
                downloadURI(uri, `${filename}.svg`);
            } else {
                // Draw the svg with styles to canvas, then download
                const canvas = await drawSVGToCanvas(svgElement);
                const uri = canvas.toDataURL(`image/${format}`);
                downloadURI(uri, `${filename}.${format}`);
            }
        });
    };

    render() {
        return (
            <div className="runic-editor">
                <div className="runic-editor__input-area">
                    <TextInput
                        ref={(e) => (this.englishInput = e)}
                        label="Input (English)"
                        placeholder="Type something here"
                        name="text-input--english"
                        bindInput={this.onEnglishChange}
                        value={initialEnglishText}
                    />
                    <span className="runic-editor__input-divider">&nbsp;</span>
                    <TextInput
                        ref={(e) => (this.phoneticInput = e)}
                        label="Input (Phonetic)"
                        placeholder="Type something here"
                        name="text-input--phonetic"
                        bindInput={this.onPhoneticChange}
                        value={initialPhoneticText}
                        spellcheck={false}
                    />
                </div>
                <div className="runic-editor__preview">
                    <div
                        className="runic-editor__svg-container"
                        ref={(e) => (this.svgContainer = e)}
                    >
                        <RuneSVG
                            ref={(e) => (this.runeSVGElement = e)}
                            interactive={false}
                            displayPhonemes={false}
                            phoneticText={initialPhoneticText}
                        ></RuneSVG>
                    </div>
                    <hr />
                    <details open>
                        <summary>Settings</summary>
                        {getSettings(this)}
                    </details>
                </div>
            </div>
        );
    }
}
