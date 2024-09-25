import { getBit, unsetBits, setBits, isBitSet, setBit, unsetBit } from "./bits";
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

function sanitizeBitmaskLeftLine(
    newBitmask: number,
    oldBitmask: number,
): number {
    const upperLeftSegment = 14 - 5;
    const lowerLeftSegment = 14 - 4;

    // 0 = both left line segments are un/set
    // 1 = only one segment is set
    const leftLinePartial =
        getBit(newBitmask, upperLeftSegment) ^
        getBit(newBitmask, lowerLeftSegment);

    if (!leftLinePartial) return newBitmask;

    // Only one of the two segments is active

    // Decide whether to set both or unset both
    const unsetBoth = unsetBits(newBitmask, upperLeftSegment, lowerLeftSegment);
    const setBoth = setBits(newBitmask, upperLeftSegment, lowerLeftSegment);

    // Check if the upper segment has changed
    const newUpperLeftBit = getBit(newBitmask, upperLeftSegment);
    const oldUpperLeftBit = getBit(oldBitmask, upperLeftSegment);
    if (newUpperLeftBit !== oldUpperLeftBit) {
        return newUpperLeftBit === 1 ? setBoth : unsetBoth;
    }

    // Check if the lower segment has changed
    const newLowerLeftBit = getBit(newBitmask, lowerLeftSegment);
    const oldLowerLeftBit = getBit(oldBitmask, lowerLeftSegment);
    if (newLowerLeftBit !== oldLowerLeftBit) {
        return newLowerLeftBit === 1 ? setBoth : unsetBoth;
    }

    throw new Error("Unreachable");
}

/**
 * The middle vertical line consists of two long segments, and one
 * small central segment. If either of the long segments is active,
 * then the central segment should be activated too. Otherwise, it
 * should be deactivated.
 */
export function sanitizeMiddleVerticalLine(bitmask: number): number {
    const upperVerticalSegment = 14 - 7;
    const lowerVerticalSegment = 14 - 10;
    const centralVerticalSegment = 14 - 13;
    if (
        isBitSet(bitmask, upperVerticalSegment) ||
        isBitSet(bitmask, lowerVerticalSegment)
    ) {
        return setBit(bitmask, centralVerticalSegment);
    } else {
        return unsetBit(bitmask, centralVerticalSegment);
    }
}

export function sanitizeBitmask(bitmask: number, oldBitmask: number) {
    bitmask = sanitizeMiddleVerticalLine(bitmask);

    bitmask = sanitizeBitmaskLeftLine(bitmask, oldBitmask);

    // If only the horizontal line is active, deactivate it.
    // If not, activate it.
    if ((bitmask & MIDDLE_LINE_MASK) === bitmask) {
        bitmask = 0;
    } else {
        bitmask |= MIDDLE_LINE_MASK;
    }

    return bitmask;
}
