import "./index.css";

import { h, Component } from "preact";
import { RuneSVG } from "components/RuneSVG";
import { translateSentence } from "src/ipa";

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

    render() {
        return (
            <div className="runic-editor">
                <div className="runic-svg-container">
                    <RuneSVG
                        ref={(e) => (this.runeSVGElement = e)}
                        interactive={false}
                        displayPhonemes={true}
                        phoneticText=""
                    ></RuneSVG>
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
