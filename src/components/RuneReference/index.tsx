import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component, VNode } from "preact";
import {
    consonantDataTable,
    symbolDataTable,
    vowelDataTable,
} from "src/runeDataset";

interface Props {}
interface State {}

function copySymbol(symbol: (typeof symbolDataTable)[0]) {
    navigator.clipboard.writeText(symbol.ipaSymbol);
}

function runeReferenceElement(symbol: (typeof symbolDataTable)[0]): VNode<any> {
    return (
        <div className="rune-reference-grid-item">
            <div
                className="rune-card"
                onClick={() => copySymbol(symbol)}
                title={`Click to copy '${symbol.ipaSymbol}'`}
            >
                <div className="svg-container">
                    <RuneSVG
                        displayPhonemes={false}
                        interactive={false}
                        phoneticText={symbol.ipaSymbol}
                    ></RuneSVG>
                </div>
                <div className="rune-info">
                    <span class="rune-info__symbol">{symbol.ipaSymbol}</span>
                    <span class="rune-info__english">
                        {symbol.english}
                        <br />
                        {symbol.examples}
                    </span>
                </div>
            </div>
        </div>
    );
}

export class RuneReference extends Component<Props, State> {
    render() {
        return (
            <>
                <h2>Vowels</h2>
                <section class="rune-reference-grid">
                    {...vowelDataTable.map(runeReferenceElement)}
                </section>
                <h2>Consonants</h2>
                <section class="rune-reference-grid">
                    {...consonantDataTable.map(runeReferenceElement)}
                </section>
            </>
        );
    }
}
