import { getConsonantComponent, getVowelComponent } from "../../rune";
import { RuneToken } from "./tokenizer";
import {
    MIDDLE_LINE_MASK,
    runeMaskToSymbolData,
    SymbolData,
} from "../../runeDataset";

export function getOrderedSymbolsArray(
    vowelBitmask: number,
    consonantBitmask: number,
    vowelBeforeConsonant: boolean,
): SymbolData[] {
    const vowelSymbol = runeMaskToSymbolData[vowelBitmask];
    const consonantSymbol = runeMaskToSymbolData[consonantBitmask];

    const ordered = [];
    if (vowelSymbol) ordered.push(vowelSymbol);
    if (consonantSymbol) ordered.push(consonantSymbol);
    if (!vowelBeforeConsonant) ordered.reverse();

    return ordered;
}

export function bitmaskToRuneToken(bitmask: number): RuneToken {
    // Vowel shit
    const vowelComponent = getVowelComponent(bitmask);
    const hasVowel =
        vowelComponent !== 0 && vowelComponent !== MIDDLE_LINE_MASK;
    const vowelBitmask = hasVowel ? vowelComponent : 0;

    // Consonant shit
    const consonantComponent = getConsonantComponent(bitmask);
    const hasConsonant =
        consonantComponent !== 0 && consonantComponent !== MIDDLE_LINE_MASK;
    const consonantBitmask = hasConsonant ? consonantComponent : 0;

    let vowelOrConsonant: RuneToken["vowelOrConsonant"] = "mixed";
    if (hasVowel && hasConsonant) {
        vowelOrConsonant = "mixed";
    } else if (hasVowel) {
        vowelOrConsonant = "vowel";
    } else if (hasConsonant) {
        vowelOrConsonant = "consonant";
    }

    const vowelBeforeConsonant = (bitmask & 1) === 1;

    const symbols = getOrderedSymbolsArray(
        vowelBitmask,
        consonantBitmask,
        vowelBeforeConsonant,
    );

    return {
        type: "phoneticSymbol",
        bitmask,
        vowelBitmask,
        consonantBitmask,
        vowelOrConsonant,
        vowelBeforeConsonant,
        symbols,
    };
}
