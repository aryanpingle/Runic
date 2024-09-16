import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component, VNode } from "preact";
import { SymbolData } from "src/runeDataset";

interface Props {
    table: SymbolData[];
}

interface State {}

function copySymbol(symbol: SymbolData) {
    navigator.clipboard.writeText(symbol.ipaSymbol);
}

function runeReferenceGridItem(symbol: SymbolData): VNode<any> {
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
                        runeColor="palegreen"
                        runeGuideColor="#242424"
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

export class RuneReferenceTable extends Component<Props, State> {
    render(props: Props) {
        return (
            <>
                <div class="rune-reference-grid">
                    {...props.table.map(runeReferenceGridItem)}
                </div>
            </>
        );
    }
}
