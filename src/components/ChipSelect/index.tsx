import "./index.css";

import { h, Component, VNode } from "preact";

interface ChipSelectChild {
    value: any;
    label: VNode | string;
}

interface Props {
    chipData: ChipSelectChild[];
    onChange: (value: string) => void;
}
interface State {}

export class ChipSelect extends Component<Props, State> {
    id: number;

    constructor(props: Props) {
        super(props);

        this.id = Math.round(Math.random() * 10000);
    }

    onChange = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        this.props.onChange(value);
    };

    render(props: Props, state: State) {
        const radioGroupName = `input-radio--${this.id}`;
        return (
            <div class="chip-select">
                {props.chipData.map((child, childIndex) => {
                    const inputId = `${radioGroupName}_${childIndex}`;
                    return (
                        <>
                            <input
                                type="radio"
                                className="chip-select__input"
                                name={radioGroupName}
                                value={child.value}
                                id={inputId}
                                checked={childIndex === 0}
                                onChange={this.onChange}
                            />
                            <label
                                className="chip-select__label"
                                htmlFor={inputId}
                            >
                                {child.label}
                            </label>
                        </>
                    );
                })}
            </div>
        );
    }
}
