import "./index.css";

import { h, Component } from "preact";
import { RuneSVG } from "components/RuneSVG";
import { translateSentence } from "src/ipa";
import { RangeInput } from "components/RangeInput";

interface Props {}

interface State {}

export class RunicEditor extends Component<Props, State> {
    runeSVGElement?: RuneSVG;

    onPhoneticChange = () => {
        const phoneticTextArea = document.querySelector(
            "textarea[name='phonetic']",
        ) as HTMLTextAreaElement;
        const phoneticText = phoneticTextArea.value;
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

    onThicknessChange = (thickness: number) => {
        this.runeSVGElement.applyStyles({
            runeThickness: thickness,
        });
    };

    onShadowChange = (spread: number) => {
        this.runeSVGElement.applyStyles({
            shadowSpread: spread,
        });
    };

    render() {
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
                            bindInput={this.onShadowChange}
                        ></RangeInput>
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
