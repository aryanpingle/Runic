import { RuneToken } from "./tokenizer";

export function getRuneBitmask(runeToken: RuneToken): number {
    // Mask for the circle indicating vowel before consonant
    const circleMask = runeToken.vowelBeforeConsonant ? 1 : 0;
    return runeToken.vowelBitmask | runeToken.consonantBitmask | circleMask;
}
