import { symbolDataTable, symbolToSymbolData, isVowel } from "src/runeDataset";

/**
 * Sanitize an English or Phonetic input.
 */
export function sanitizeTextInput(s: string): string {
    // Split into lines
    const lines = s.split("\n");

    const sanitized = lines
        .map((line) => line.trim().replace(/\s+/g, " "))
        .join("\n");

    return sanitized;
}

function parseString(s: string, i: number, tokens: string[]): boolean {
    if (i === s.length) return true;

    const c = s.charAt(i);

    // " " | "\n"
    if (c === " " || c === "\n") {
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

export function textToBitmaskLines(s: string): number[][][] {
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

        if (phoneme === "\n") {
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
