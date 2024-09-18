import "./index.css";

import { h, Component } from "preact";

interface Props {
    label: string;
    defaultColor: string;
    bindInput?: (color: string) => void;
}

interface State {}

export class ColorInput extends Component<Props, State> {
    indicatorElement: HTMLElement;

    bindInput = (event: Event) => {
        const inputElement = event.currentTarget as HTMLInputElement;
        const value = inputElement.value;
        this.props.bindInput(value);

        // Change the indicator
        this.indicatorElement.style.backgroundColor = value;
    };

    render(props: Props, state: State) {
        return (
            <div className="color-input">
                <input type="color" onInput={this.bindInput} id="idk" />
                <label className="color-input__label" htmlFor="idk">
                    {props.label}
                </label>
                <div
                    className="color-input__indicator"
                    style={{ backgroundColor: props.defaultColor }}
                    ref={(e) => (this.indicatorElement = e)}
                ></div>
            </div>
        );
    }
}
