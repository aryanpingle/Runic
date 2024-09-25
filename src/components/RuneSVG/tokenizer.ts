import { isVowel, SymbolData, symbolDataTable } from "../../runeDataset";
import { bitmaskToRuneToken } from "./utils";

export type RenderableToken = RuneToken | CharacterToken;

export interface RuneToken {
    type: "phoneticSymbol";
    vowelOrConsonant: "vowel" | "consonant" | "mixed";
    bitmask: number;
    vowelBitmask: number;
    consonantBitmask: number;
    vowelBeforeConsonant: boolean;
    symbols: SymbolData[];
}

export interface CharacterToken {
    type: "specialChar";
    char: string;
}

export function parseString(s: string): RenderableToken[] {
    const tokens: RenderableToken[] = [];

    let i = 0;
    let isEnglishMode = false;
    while (i < s.length) {
        const c = s.charAt(i);

        // Try to find a symbol that starts from the current index onwards
        // The symbolDataTable is sorted by ipaSymbol length, so we
        // are guaranteed to get a match with the longest ipaSymbol length.
        let found = false;
        let foundSymbolData: SymbolData = null;
        for (const symbolData of symbolDataTable) {
            if (s.startsWith(symbolData.ipaSymbol, i)) {
                found = true;
                foundSymbolData = symbolData;
                break;
            }
        }

        if (found && !isEnglishMode) {
            const ipaSymbol = foundSymbolData.ipaSymbol;

            const token = bitmaskToRuneToken(foundSymbolData.mask);
            tokens.push(token);

            i += ipaSymbol.length;
        } else if (c === "@") {
            isEnglishMode = !isEnglishMode;

            i += 1;
        } else {
            // No phonetic symbol starts from this character onwards.
            // Treat this character like a special character.
            const token: CharacterToken = { type: "specialChar", char: c };
            tokens.push(token);

            i += 1;
        }
    }

    const mergedTokens = getMergedTokens(tokens);

    return mergedTokens;
}

function canMergeTokens(
    first: RenderableToken,
    second: RenderableToken,
): boolean {
    // Ensure both are phonetic tokens
    if (first.type !== "phoneticSymbol" || second.type !== "phoneticSymbol")
        return false;

    // Neither should be mixed type
    if (first.vowelOrConsonant === "mixed") return false;
    if (second.vowelOrConsonant === "mixed") return false;

    // They shouldn't be of the same type
    if (first.vowelOrConsonant === second.vowelOrConsonant) return false;

    return true;
}

function mergeTokens(first: RuneToken, second: RuneToken): RuneToken {
    const vowelBitmask = first.vowelBitmask | second.vowelBitmask;
    const consonantBitmask = first.consonantBitmask | second.consonantBitmask;
    const vowelBeforeConsonant = first.consonantBitmask === 0;

    const bitmask =
        vowelBitmask | consonantBitmask | (vowelBeforeConsonant ? 1 : 0);

    return bitmaskToRuneToken(bitmask);
}

export function getLineTokenCounts(tokens: RenderableToken[]): number[] {
    const lineTokenCounts = [0];
    tokens.forEach((token) => {
        if (token.type === "specialChar" && token.char === "\n") {
            lineTokenCounts.push(0);
        } else {
            ++lineTokenCounts[lineTokenCounts.length - 1];
        }
    });
    return lineTokenCounts;
}

export function splitTokensIntoLines(
    tokens: RenderableToken[],
): RenderableToken[][] {
    const lines = [[]];

    tokens.forEach((token) => {
        if (token.type === "specialChar" && token.char === "\n") {
            lines.push([]);
        } else {
            lines[lines.length - 1].push(token);
        }
    });

    return lines;
}

function getMergedTokens(tokens: RenderableToken[]) {
    const newTokens: RenderableToken[] = [];

    for (const token of tokens) {
        const lastToken = newTokens[newTokens.length - 1];
        if (newTokens.length === 0) {
            // Empty tokens list
            newTokens.push(token);
        } else if (canMergeTokens(lastToken, token)) {
            // Merge the previous and current token
            const newToken = mergeTokens(
                lastToken as RuneToken,
                token as RuneToken,
            );
            newTokens[newTokens.length - 1] = newToken;
        } else {
            // Can't merge
            newTokens.push(token);
        }
    }

    return newTokens;
}
