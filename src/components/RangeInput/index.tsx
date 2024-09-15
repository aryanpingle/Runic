import "./index.css";

import { h, Component } from "preact";

export interface Props {
    min: number;
    max: number;
    step: number;
    default: number;
    label: string;
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
}

export interface State {
    value: number;
}

export class RangeInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Set default value
        this.setState({ value: props.default });
    }

    onChange = (event: Event) => {
        // Fire onChange listener
        this.props.onChange?.(event);
    };

    onInput = (event: Event) => {
        // Set labels
        const inputElement = event.currentTarget as HTMLInputElement;
        const value = parseFloat(inputElement.value);
        this.setState({
            value: value,
        });

        // Fire onInput listener
        this.props.onInput?.(event);
    };

    render(props: Props, state: State) {
        return (
            <div className="range-input">
                <div className="range-input__info">
                    <div className="range-input__label">{props.label}</div>
                    <div className="range-input__value">{state.value}</div>
                </div>
                <input
                    className="range-input__input-element"
                    type="range"
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    defaultValue={String(props.default)}
                    onChange={this.onChange}
                    onInput={this.onInput}
                />
            </div>
        );
    }
}
