import { h, Component, VNode } from "preact";
import { Rune, RUNE_HEIGHT, RUNE_WIDTH } from "../Rune";
import {
    isVowel,
    symbolDataTable,
    symbolToSymbolData,
} from "../../runeDataset";

interface Props {
    text: string;
}

interface State {
    lines: number[][][];
}

const SVG_PADDING = 1;

function parseString(s: string, i: number, tokens: string[]): boolean {
    if (i === s.length) return true;

    const c = s.charAt(i);

    // " " | "\"
    if (c === " " || c === "/") {
        tokens.push(c);
        return parseString(s, i + 1, tokens);
    }

    // character (may not be symbol)
    // Try to find the symbol that matches it
    for (const symbolData of symbolDataTable) {
        if (s.startsWith(symbolData.ipaSymbol, i)) {
            const ipaSymbol = symbolData.ipaSymbol;
            tokens.push(ipaSymbol);

            // Check if using this symbol results in a valid parse
            const parseResult = parseString(s, i + ipaSymbol.length, tokens);
            if (parseResult) return true;

            tokens.pop();
        }
    }

    // No symbols matched here
    return false;
}

function textToBitmaskLines(s: string): number[][][] {
    const tokens: string[] = [];

    // console.log("Parsing");
    parseString(s, 0, tokens);
    // console.log(`Tokens =`, tokens);

    let currentWord = [];

    let currentLine = [];
    currentLine.push(currentWord);

    const lines: number[][][] = [];
    lines.push(currentLine);

    let lastSymbol: "vowel" | "consonant" | "both";

    for (const phoneme of tokens) {
        if (phoneme === " ") {
            // Add word
            currentWord = [];
            currentLine.push(currentWord);

            lastSymbol = "both";
            continue;
        }

        if (phoneme === "/") {
            // Add line
            currentWord = [];

            currentLine = [];
            currentLine.push(currentWord);

            lines.push(currentLine);

            lastSymbol = "both";
            continue;
        }

        const bitmask = symbolToSymbolData[phoneme].mask;

        const isV = isVowel(phoneme);

        if (isV) {
            if (lastSymbol === "consonant") {
                // console.log("Adding", phoneme);
                // Join
                currentWord[currentWord.length - 1] |= bitmask;
                lastSymbol = "both";
            } else {
                // console.log("Merging", phoneme);
                // Add
                currentWord.push(bitmask);
                lastSymbol = "vowel";
            }
        } else {
            if (lastSymbol === "vowel") {
                // console.log("Adding", phoneme);
                // Join
                currentWord[currentWord.length - 1] |= bitmask;
                // Vowel before consonant
                currentWord[currentWord.length - 1] |= 1;
                lastSymbol = "both";
            } else {
                // console.log("Merging", phoneme);
                // Add
                currentWord.push(bitmask);
                lastSymbol = "consonant";
            }
        }
    }

    // console.log("bitmasks created", lines);
    return lines;
}

export class RuneSVG extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.setState({
            lines: textToBitmaskLines(props.text),
        });
    }

    public getRunes(): VNode<Rune>[] {
        const runesArray = [];

        this.state.lines.forEach((line, lineIndex) => {
            let tx = 0;
            line.forEach((word, wordIndex) => {
                word.forEach((bitmask, runeIndex) => {
                    const ty = lineIndex * (RUNE_HEIGHT + SVG_PADDING);
                    const transformation = `translate(${tx}, ${ty})`;
                    runesArray.push(
                        <Rune
                            bitmask={bitmask}
                            transform={transformation}
                        ></Rune>,
                    );
                    tx += RUNE_WIDTH;
                });

                // Space after a word
                tx += RUNE_WIDTH / 2;
            });
        });

        return runesArray;
    }

    private getViewBox(): string {
        // Calculate maximum width among the lines
        let maxLineWidth = 0;
        this.state.lines.forEach((line) => {
            let lineWidth = 0;
            // Add rune widths
            line.forEach((word) => {
                lineWidth += word.length * RUNE_WIDTH;
            });
            // Add spacing between words
            lineWidth += line.length * (RUNE_WIDTH / 2);

            // Add width of runes
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        });
        // Padding on either side + max line width
        const SVG_VIEWBOX_WIDTH = 2 * SVG_PADDING + maxLineWidth;

        const NUM_LINES = this.state.lines.length;
        const SVG_VIEWBOX_HEIGHT =
            2 * SVG_PADDING + // Padding on either side
            RUNE_HEIGHT * NUM_LINES + // Height of all lines
            (NUM_LINES - 1) * (RUNE_WIDTH / 2); // Spacing between lines

        const viewBox = `-${SVG_PADDING} -${SVG_PADDING} ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`;
        return viewBox;
    }

    render(props: Props, { lines }: State) {
        const bitmasks = this.state.lines.flat().flat();
        const RUNE_COUNT = bitmasks.length;

        return (
            <svg width={512} height={512} viewBox={this.getViewBox()}>
                {...this.getRunes()}
            </svg>
        );
    }
}
