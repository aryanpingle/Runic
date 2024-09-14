import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component } from "preact";
import { symbolDataTable } from "src/runeDataset";

interface Props {}
interface State {}

export class RuneReference extends Component<Props, State> {
    render() {
        return (
            <section class="rune-reference-grid">
                {...symbolDataTable.map((symbol) => (
                    <div className="rune-reference-grid-item">
                        <RuneSVG
                            displayPhonemes={true}
                            interactive={false}
                            phoneticText={symbol.ipaSymbol}
                        ></RuneSVG>
                    </div>
                ))}
            </section>
        );
    }
}
