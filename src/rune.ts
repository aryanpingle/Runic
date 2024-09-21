import {
    VOWEL_MASK,
    MIDDLE_LINE_MASK,
    runeMaskToSymbolData,
    CONSONANT_MASK,
    vowelDataTable,
    symbolToSymbolData,
    consonantDataTable,
} from "./runeDataset";
import { countSetBits } from "./utils";

function containsBitmask(bitstring: number, bitmask: number) {
    return (bitstring & bitmask) === bitmask;
}

function hasValidVowel(runeMask: number) {
    if ((runeMask & VOWEL_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeMask & VOWEL_MASK) in runeMaskToSymbolData;
}

function hasValidConsonant(runeMask: number) {
    if ((runeMask & CONSONANT_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeMask & CONSONANT_MASK) in runeMaskToSymbolData;
}

/**
 * Get a mask corresponding to the bitmask's vowel segments.
 */
export function getVowelComponent(bitmask: number): number {
    return bitmask & VOWEL_MASK;
}

/**
 * Get a mask corresponding to the bitmask's consonant segments.
 */
export function getConsonantComponent(bitmask: number): number {
    return bitmask & CONSONANT_MASK;
}

function extractVowel(runeMask: number): string {
    // Check if the vowel pattern is invalid
    if (!hasValidVowel(runeMask)) return null;

    let resultSymbol = "";
    for (const symbolData of vowelDataTable) {
        if (containsBitmask(runeMask, symbolData.mask)) {
            // This symbol is a match.
            // We want the matching symbol with the most number of set bits.
            const setBitsInSymbol = countSetBits(symbolData.mask);

            if (resultSymbol === "") {
                resultSymbol = symbolData.ipaSymbol;
                continue;
            }

            const setBitsInCurrentResult = countSetBits(
                symbolToSymbolData[resultSymbol].mask,
            );

            if (setBitsInSymbol > setBitsInCurrentResult) {
                resultSymbol = symbolData.ipaSymbol;
            }
        }
    }
    return resultSymbol;
}

function extractConsonant(runeMask: number): string {
    // Check if the consonant pattern is invalid
    if (!hasValidConsonant(runeMask)) return null;

    let resultSymbol = "";
    for (const symbolData of consonantDataTable) {
        if (containsBitmask(runeMask, symbolData.mask)) {
            // This symbol is a match.
            // We want the matching symbol with the most number of set bits.
            const setBitsInSymbol = countSetBits(symbolData.mask);

            if (resultSymbol === "") {
                resultSymbol = symbolData.ipaSymbol;
                continue;
            }

            const setBitsInCurrentResult = countSetBits(
                symbolToSymbolData[resultSymbol].mask,
            );

            if (setBitsInSymbol > setBitsInCurrentResult) {
                resultSymbol = symbolData.ipaSymbol;
            }
        }
    }
    return resultSymbol;
}

export function getInfoFromRuneMask(runeMask: number) {
    const vowel = extractVowel(runeMask);
    const consonant = extractConsonant(runeMask);
    const vowelBeforeConsonant = runeMask % 2 === 1;

    return {
        vowel,
        consonant,
        vowelBeforeConsonant,
    };
}
