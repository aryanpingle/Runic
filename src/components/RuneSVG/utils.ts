import { getConsonantComponent, getVowelComponent } from "../../rune";
import { RuneToken } from "./tokenizer";
import { MIDDLE_LINE_MASK } from "../../runeDataset";

export function getRuneBitmask(runeToken: RuneToken): number {
    // Mask for the circle indicating vowel before consonant
    const circleMask = runeToken.vowelBeforeConsonant ? 1 : 0;
    return runeToken.vowelBitmask | runeToken.consonantBitmask | circleMask;
}

export function bitmaskToRuneToken(bitmask: number): RuneToken {
    const token = {
        type: "phoneticSymbol",
    } as RuneToken;

    // Vowel shit
    const vowelComponent = getVowelComponent(bitmask);
    const hasVowel =
        vowelComponent !== 0 && vowelComponent !== MIDDLE_LINE_MASK;
    token.vowelBitmask = hasVowel ? vowelComponent : 0;

    // Consonant shit
    const consonantComponent = getConsonantComponent(bitmask);
    const hasConsonant =
        consonantComponent !== 0 && consonantComponent !== MIDDLE_LINE_MASK;
    token.consonantBitmask = hasConsonant ? consonantComponent : 0;

    if (hasVowel && hasConsonant) {
        token.vowelOrConsonant = "mixed";
    } else if (hasVowel) {
        token.vowelOrConsonant = "vowel";
    } else if (hasConsonant) {
        token.vowelOrConsonant = "consonant";
    } else {
        token.vowelOrConsonant = "mixed";
    }

    token.vowelBeforeConsonant = (bitmask & 1) === 1;

    token.symbols = "UNSET";

    return token;
}
