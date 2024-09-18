import "./index.css";

import { h, Component } from "preact";
import { RuneSVG } from "components/RuneSVG";
import { translateSentence } from "src/ipa";
import { RangeInput } from "components/RangeInput";
import { downloadURI, drawSVGToCanvas } from "./utils";
import {
    CenterAlignIcon,
    DownloadIcon,
    LeftAlignIcon,
    RightAlignIcon,
} from "components/icons";
import { ChipSelect } from "components/ChipSelect";
import { ColorInput } from "components/ColorInput";

interface Props {}

interface State {}

export class RunicEditor extends Component<Props, State> {
    runeSVGElement?: RuneSVG;

    // Listeners

    onPhoneticChange = () => {
        const phoneticTextArea = document.querySelector(
            "textarea[name='phonetic']",
        ) as HTMLTextAreaElement;
        const phoneticText = phoneticTextArea.value;
        // TODO: This really should be a state then
        this.runeSVGElement.renderPhoneticText(phoneticText);
        this.runeSVGElement.forceUpdate();
    };

    onEnglishChange = () => {
        const textArea = document.querySelector(
            "textarea[name='english']",
        ) as HTMLTextAreaElement;
        const englishtext = textArea.value;

        const lines = englishtext.split("/");
        const translatedLines = lines.map(translateSentence);
        const translatedText = translatedLines.join("/");

        const phoneticTextArea = document.querySelector(
            "textarea[name='phonetic']",
        ) as HTMLTextAreaElement;
        phoneticTextArea.value = translatedText;
        this.onPhoneticChange();
    };

    onSpreadChange = (spread: number) => {
        this.runeSVGElement.setState({ shadowSpread: spread });
    };

    onThicknessChange = (thickness: number) => {
        this.runeSVGElement.setState({ runeThickness: thickness });
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
    };

    // Miscellaneous

    download = (format: "svg" | "png" | "jpeg") => {
        const svgElement = this.runeSVGElement.svgElement;

        if (format === "svg") {
            // TODO
        } else {
            drawSVGToCanvas(svgElement).then((canvas) => {
                const uri = canvas.toDataURL(`image/${format}`);
                downloadURI(uri, `temp.${format}`);
            });
        }
    };

    render() {
        const AlignmentSelect = (
            <ChipSelect
                chipData={[
                    {
                        value: "left",
                        label: <LeftAlignIcon width="1.25em" height="1.25em" />,
                    },
                    {
                        value: "center",
                        label: (
                            <CenterAlignIcon width="1.25em" height="1.25em" />
                        ),
                    },
                    {
                        value: "right",
                        label: (
                            <RightAlignIcon width="1.25em" height="1.25em" />
                        ),
                    },
                ]}
                onChange={this.onAlignmentChange}
            />
        );
        const PhonemeSelect = (
            <ChipSelect
                chipData={[
                    { value: "false", label: "Hide phonemes" },
                    { value: "true", label: "Show phonemes" },
                ]}
                onChange={this.onPhonemeDisplayChange}
            />
        );
        return (
            <div className="runic-editor">
                <div className="runic-editor__preview">
                    <div className="runic-editor__svg-container">
                        <RuneSVG
                            ref={(e) => (this.runeSVGElement = e)}
                            interactive={false}
                            displayPhonemes={false}
                            phoneticText="sikɹət ɫɛdʒənd"
                        ></RuneSVG>
                    </div>
                    <hr />
                    <div className="runic-editor__settings-container">
                        <RangeInput
                            label={"Thickness"}
                            min={0.05}
                            max={0.5}
                            step={0.01}
                            default={0.25}
                            bindInput={this.onThicknessChange}
                        ></RangeInput>
                        <RangeInput
                            label={"Shadow"}
                            min={0}
                            max={20}
                            step={0.5}
                            default={0}
                            bindInput={this.onSpreadChange}
                        ></RangeInput>
                        <div className="runic-editor__download-group">
                            <button
                                className="runic-editor__download-button"
                                onClick={() => this.download("svg")}
                            >
                                <DownloadIcon /> SVG
                            </button>
                            <button
                                className="runic-editor__download-button"
                                onClick={() => this.download("png")}
                            >
                                <DownloadIcon /> PNG
                            </button>
                            <button
                                className="runic-editor__download-button"
                                onClick={() => this.download("jpeg")}
                            >
                                <DownloadIcon /> JPEG
                            </button>
                        </div>
                        {AlignmentSelect}
                        {PhonemeSelect}
                        <ColorInput
                            defaultColor="crimson"
                            bindInput={this.onRuneColorChange}
                            label="Rune Color"
                        />
                        <ColorInput
                            defaultColor="transparent"
                            bindInput={this.onBackgroundChange}
                            label="Background"
                        />
                    </div>
                </div>
                <textarea
                    name="phonetic"
                    id=""
                    onInput={this.onPhoneticChange}
                ></textarea>
                <textarea
                    name="english"
                    id=""
                    onInput={this.onEnglishChange}
                ></textarea>
            </div>
        );
    }
}
