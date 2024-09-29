import {
    CancelIcon,
    PlusIcon,
    ResetIcon,
    SpaceKeyIcon,
} from "components/icons";
import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { TextInput } from "components/TextInput";
import { h, Component } from "preact";
import { parseString, RuneToken } from "components/RuneSVG/tokenizer";
import { bitmaskToRuneToken } from "components/RuneSVG/utils";

interface Props {}

interface State {
    phoneticText: string;
}

export class RunicPlayground extends Component<Props, State> {
    runeSVG?: RuneSVG;
    phoneticTextInput?: TextInput;

    state: State = {
        phoneticText: "",
    };

    componentDidUpdate() {
        this.resetRunicSVG();
    }

    componentDidMount() {
        this.resetRunicSVG();
    }

    resetRunicSVG() {
        // Create a blank rune
        this.runeSVG.tokens = [bitmaskToRuneToken(0)];
        this.runeSVG.forceUpdate();
    }

    addPhoneme = () => {
        const token = this.runeSVG.tokens[0] as RuneToken;
        if (token.bitmask === 0) return;

        const phonemeString = token.symbols.map((s) => s.ipaSymbol).join("");
        const currentPhoneticText = this.state.phoneticText;
        this.setState({ phoneticText: currentPhoneticText + phonemeString });
    };

    addSpace = () => {
        const currentPhoneticText = this.state.phoneticText;
        this.setState({ phoneticText: currentPhoneticText + " " });
    };

    resetRune = () => {
        const currentPhoneticText = this.state.phoneticText;
        this.setState({ phoneticText: currentPhoneticText });
    };

    getPronunciation = (): string => {
        const tokens = parseString(this.state.phoneticText);
        let res = "";
        const PHONEME_SEPARATOR = "◦";
        for (const token of tokens) {
            if (token.type === "specialChar") {
                res += " ";
            } else {
                res +=
                    token.symbols
                        .map((s) => s.english)
                        .join(PHONEME_SEPARATOR) + PHONEME_SEPARATOR;
            }
        }
        res = res.replace(new RegExp(PHONEME_SEPARATOR + "(?=\\s|$)", "g"), "");

        return res.trim();
    };

    onPhoneticTextChange = (phoneticText: string) => {
        this.setState({ phoneticText: phoneticText });
    };

    render(props: Props, state: State) {
        return (
            <div className="runic-playground">
                <div className="runic-playground__svg-container">
                    <RuneSVG
                        ref={(e) => (this.runeSVG = e)}
                        phoneticText="aɪ"
                        interactive={true}
                        displayPhonemes={true}
                        runeThickness={0.5}
                        runeColor=""
                        runeGuideColor=""
                    />
                </div>
                <div className="runic-playground__manuals">
                    <div className="runic-playground__controls">
                        <button
                            className="runic-playground__control-button"
                            onClick={this.addPhoneme}
                        >
                            <span className="runic-playground__control-icon">
                                <PlusIcon />
                            </span>
                            Add Phoneme
                        </button>
                        <button
                            className="runic-playground__control-button"
                            onClick={this.addSpace}
                        >
                            <span className="runic-playground__control-icon">
                                <SpaceKeyIcon />
                            </span>
                            Spacebar
                        </button>
                    </div>
                    <div className="runic-playground__controls">
                        <button
                            className="runic-playground__control-button"
                            onClick={this.resetRune}
                        >
                            <span className="runic-playground__control-icon">
                                <CancelIcon />
                            </span>
                            Cancel Rune
                        </button>
                        <button
                            className="runic-playground__control-button"
                            onClick={this.addPhoneme}
                        >
                            <span className="runic-playground__control-icon">
                                <ResetIcon />
                            </span>
                            Clear Result
                        </button>
                    </div>
                    <TextInput
                        ref={(e) => (this.phoneticTextInput = e)}
                        label="Result (Phonetic)"
                        placeholder="Phonetic text goes here"
                        value={state.phoneticText}
                        bindInput={this.onPhoneticTextChange}
                    />
                    <TextInput
                        label="Result (Syllables)"
                        placeholder="Pronunciation of the phonemes"
                        disabled={true}
                        value={this.getPronunciation()}
                    />
                </div>
            </div>
        );
    }
}
