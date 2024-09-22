import "./index.css";

import { h, Component } from "preact";

interface Props extends preact.JSX.HTMLAttributes {
    label: string;
    bindInput?: (text: string) => void;
}

interface State {}

export class TextInput extends Component<Props, State> {
    textareaElement?: HTMLTextAreaElement;

    setText(text: string) {
        this.textareaElement.value = text;
        this.onInput();
    }

    onInput = () => {
        const value = this.textareaElement.value;

        // Pass it to the prop
        this.props.bindInput(value);

        // Determine the number of lines
        const numLines = (value.match(/\n/g) || []).length + 1;
        // Additional 1 line to show the user it can be multiline
        this.textareaElement.rows = numLines + 1;
    };

    componentDidMount() {
        // When it mounts, determine the number of lines
        const value = this.textareaElement.value;
        // Determine the number of lines
        const numLines = (value.match(/\n/g) || []).length + 1;
        // Additional 1 line to show the user it can be multiline
        this.textareaElement.rows = numLines + 1;
    }

    render(props: Props, state: State) {
        const { label, bindInput, ...otherAttrs } = props;
        return (
            <div className="text-input">
                <label className="text-input__label">{label}:</label>
                <textarea
                    ref={(e) => (this.textareaElement = e)}
                    className="text-input__textarea"
                    {...(otherAttrs as any)}
                    onInput={this.onInput}
                    // 2 so that the user understands you can
                    rows={2}
                ></textarea>
            </div>
        );
    }
}
