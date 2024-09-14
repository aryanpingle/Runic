import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component } from "preact";
import {
    consonantDataTable,
    symbolDataTable,
    vowelDataTable,
} from "src/runeDataset";

interface Props {}
interface State {}

export class RuneReference extends Component<Props, State> {
    render() {
        return (
            <>
                <h1>Vowels</h1>
                <section class="rune-reference-grid">
                    {...vowelDataTable.map((symbol) => (
                        <div className="rune-reference-grid-item">
                            <RuneSVG
                                displayPhonemes={true}
                                interactive={false}
                                phoneticText={symbol.ipaSymbol}
                            ></RuneSVG>
                        </div>
                    ))}
                </section>
                <h1>Secret Legend</h1>
                <section class="rune-reference-grid">
                    {...consonantDataTable.map((symbol) => (
                        <div className="rune-reference-grid-item">
                            <RuneSVG
                                displayPhonemes={true}
                                interactive={false}
                                phoneticText={symbol.ipaSymbol}
                            ></RuneSVG>
                        </div>
                    ))}
                </section>
            </>
        );
    }
}
