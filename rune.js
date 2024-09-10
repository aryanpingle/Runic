const RUNE_ID_LENGTH = 15;

const vowelDataTable = [
    {
        ipaSymbol: "æ",
        mask: 0b110011100000000,
        english: "a",
        examples: "has, apple, ash",
    },
    {
        ipaSymbol: "ɑ:",
        mask: 0b111100100000000,
        english: "ah",
        examples: "arm, large, far",
    },
    {
        ipaSymbol: "ɒ",
        mask: 0b100011100000000,
        english: "aw",
        examples: "box, awesome, swan",
    },
    {
        ipaSymbol: "eɪ",
        mask: 0b100000100000000,
        english: "ay/ei",
        examples: "maid, break, they",
    },
    {
        ipaSymbol: "ɛ",
        mask: 0b101111000000000,
        english: "eh",
        examples: "end, bread, said",
    },
    {
        ipaSymbol: "i:",
        mask: 0b101111100000000,
        english: "ee",
        examples: "bee, meat, key",
    },
    {
        ipaSymbol: "ɪəʳ",
        mask: 0b101011100000000,
        english: "ear",
        examples: "ear, beer, steer",
    },
    {
        ipaSymbol: "ə",
        mask: 0b110000100000000,
        english: "uh",
        examples: "about, other, uhh",
    },
    {
        ipaSymbol: "eəʳ",
        mask: 0b101011000000000,
        english: "air",
        examples: "air, heir, there",
    },
    {
        ipaSymbol: "ɪ",
        mask: 0b101100000000000,
        english: "i",
        examples: "it, gym, brim",
    },
    {
        ipaSymbol: "aɪ",
        mask: 0b110000000000000,
        english: "aye",
        examples: "ice, spider, pie",
    },
    {
        ipaSymbol: "ɜ:ʳ",
        mask: 0b111111000000000,
        english: "uhr",
        examples: "bird, burn, pearl",
    },
    {
        ipaSymbol: "oʊ",
        mask: 0b111111100000000,
        english: "oh",
        examples: "open, boat, moan",
    },
    {
        ipaSymbol: "ɔɪ",
        mask: 0b100100000000000,
        english: "oi",
        examples: "join, boy, coin",
    },
    {
        ipaSymbol: "u:",
        mask: 0b110111100000000,
        english: "ooo",
        examples: "who, blue, soon",
    },
    {
        ipaSymbol: "ʊ",
        mask: 0b100111000000000,
        english: "oo",
        examples: "wolf, bush, would",
    },
    {
        ipaSymbol: "aʊ",
        mask: 0b101000000000000,
        english: "ow",
        examples: "now, shout, bow",
    },
    {
        ipaSymbol: "ʊəʳ",
        mask: 0b111011100000000,
        english: "our",
        examples: "tour, cure, sure",
    },
];

const VOWEL_MASK = 0b111111100000000;

const consonantDataTable = [
    {
        ipaSymbol: "b",
        mask: 0b100000010100010,
        english: "b",
        examples: "ball, abe, bird",
    },
    {
        ipaSymbol: "tʃ",
        mask: 0b100000000010110,
        english: "tch",
        examples: "watch, chair, future",
    },
    {
        ipaSymbol: "d",
        mask: 0b100000010101010,
        english: "d",
        examples: "doll, damn, deep",
    },
    {
        ipaSymbol: "f",
        mask: 0b100000001011010,
        english: "f",
        examples: "fall, fit, fill",
    },
    {
        ipaSymbol: "g",
        mask: 0b100000001110010,
        english: "g",
        examples: "gun, egg, ghost",
    },
    {
        ipaSymbol: "h",
        mask: 0b100000010110010,
        english: "h",
        examples: "hop, who, help",
    },
    {
        ipaSymbol: "dʒ",
        mask: 0b100000010001010,
        english: "dj",
        examples: "jam, giraffe, edge",
    },
    {
        ipaSymbol: "k",
        mask: 0b100000011100010,
        english: "k",
        examples: "mask, cat, rack",
    },
    {
        ipaSymbol: "l",
        mask: 0b100000010010010,
        english: "l",
        examples: "live, well, land",
    },
    {
        ipaSymbol: "m",
        mask: 0b100000000101000,
        english: "m",
        examples: "man, sum, comb",
    },
    {
        ipaSymbol: "n",
        mask: 0b100000000101100,
        english: "n",
        examples: "no, never, nice",
    },
    {
        ipaSymbol: "ŋ",
        mask: 0b100000011111110,
        english: "ng",
        examples: "ring, pink, tongue",
    },
    {
        ipaSymbol: "p",
        mask: 0b100000001010010,
        english: "p",
        examples: "pip, pretty, pop",
    },
    {
        ipaSymbol: "r",
        mask: 0b100000011010010,
        english: "r",
        examples: "rice, rune, rim",
    },
    {
        ipaSymbol: "s",
        mask: 0b100000011011010,
        english: "s",
        examples: "sit, less, circle",
    },
    {
        ipaSymbol: "ʃ",
        mask: 0b100000001111110,
        english: "sh",
        examples: "sham, sure, ocean",
    },
    {
        ipaSymbol: "t",
        mask: 0b100000001010110,
        english: "t",
        examples: "tip, matter, tomato",
    },
    {
        ipaSymbol: "θ",
        mask: 0b100000011010110,
        english: "th (hard)",
        examples: "theta, theme, thaw",
    },
    {
        ipaSymbol: "ð",
        mask: 0b100000010111010,
        english: "th (gentle)",
        examples: "leather, the, them",
    },
    {
        ipaSymbol: "v",
        mask: 0b100000010100110,
        english: "v",
        examples: "vine, five, very",
    },
    {
        ipaSymbol: "w",
        mask: 0b100000001000100,
        english: "w",
        examples: "why, where, quick",
    },
    {
        ipaSymbol: "j",
        mask: 0b100000010010110,
        english: "yuh",
        examples: "you, onion, yup",
    },
    {
        ipaSymbol: "z",
        mask: 0b100000010110110,
        english: "z",
        examples: "zed, buzz, his",
    },
    {
        ipaSymbol: "ʒ",
        mask: 0b100000011101110,
        english: "zh",
        examples: "treasure, azure, division",
    },
];

const CONSONANT_MASK = 0b100000011111110;

const MIDDLE_LINE_MASK = 0b100000000000000;

const symbolDataTable = [
    // Blank
    { ipaSymbol: "", mask: 0b000000000000000, english: "", examples: "" },
    // Vowels
    ...vowelDataTable,
    // Consonants
    ...consonantDataTable,
];

function countSetBits(bitstring) {
    let count = 0;
    while (bitstring != 0) {
        count += bitstring % 2;
        bitstring = bitstring >> 1;
    }
    return count;
}

// Map from symbol to symbol data
const symbolToSymbolData = Object.fromEntries(
    symbolDataTable.map((symbolData) => [symbolData.ipaSymbol, symbolData])
);
// Map from runeMask to symbol
const runeMaskToSymbolData = Object.fromEntries(
    symbolDataTable.map((symbolData) => [symbolData.mask, symbolData])
);

function getRune() {
    // Order matters
    return `
    <g class="rune">
        <g class="rune-segments-guide">
            ${getRuneSegments()}
        </g>
        <g class="rune-segments-actual">
            ${getRuneSegments()}
        </g>
        <g class="rune-segments-hover">
            ${getRuneSegments()}
        </g>
    </g>
    `;
}

/**
 * @param {string} bitstring
 * @param {string} mask
 */
function containsBitmask(bitstring, bitmask) {
    return (bitstring & bitmask) === bitmask;
}

function hasValidVowel(runeMask) {
    if ((runeMask & VOWEL_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeMask & VOWEL_MASK) in runeMaskToSymbolData;
}

function hasValidConsonant(runeMask) {
    if ((runeMask & CONSONANT_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeMask & CONSONANT_MASK) in runeMaskToSymbolData;
}

function extractVowel(runeMask) {
    // Check if the consonant pattern is invalid
    if (!hasValidVowel(runeMask)) return null;

    let resultSymbol = "";
    for (const symbolData of vowelDataTable) {
        if (containsBitmask(runeMask, symbolData.mask)) {
            // This symbol is a match.
            // We want the matching symbol with the most number of set bits.
            const setBitsInSymbol = countSetBits(symbolData.mask);
            const setBitsInCurrentResult = countSetBits(
                symbolToSymbolData[resultSymbol].mask
            );

            if (setBitsInSymbol > setBitsInCurrentResult) {
                resultSymbol = symbolData.ipaSymbol;
            }
        }
    }
    return resultSymbol;
}

function extractConsonant(runeMask) {
    // Check if the consonant pattern is invalid
    if (!hasValidConsonant(runeMask)) return null;

    let resultSymbol = "";
    for (const symbolData of consonantDataTable) {
        if (containsBitmask(runeMask, symbolData.mask)) {
            // This symbol is a match.
            // We want the matching symbol with the most number of set bits.
            const setBitsInSymbol = countSetBits(symbolData.mask);
            const setBitsInCurrentResult = countSetBits(
                symbolToSymbolData[resultSymbol].mask
            );

            if (setBitsInSymbol > setBitsInCurrentResult) {
                resultSymbol = symbolData.ipaSymbol;
            }
        }
    }
    return resultSymbol;
}

/**
 * @param {number} runeMask
 */
function getInfoFromRuneMask(runeMask) {
    const vowel = extractVowel(runeMask);
    const consonant = extractConsonant(runeMask);
    const vowelBeforeConsonant = runeMask % 2 === 1;

    return {
        vowel,
        consonant,
        vowelBeforeConsonant,
    };
}

function getRuneLine(coords1, coords2, index) {
    return `
    <line
        class="rune-segment"
        rune-segment-index="${index}"
        x1="${coords1[0]}"
        y1="${coords1[1]}"
        x2="${coords2[0]}"
        y2="${coords2[1]}"
    >
    </line>`;
}

function getRuneUnderring() {
    return `
    <circle
        class="rune-segment"
        rune-segment-index="${14}"
        cx="${1.5}"
        cy="${6.5}"
        r="0.5"
        fill="none"
    >
    </circle>
    `;
}

function getRuneSegments() {
    // Takes up a rect of (width, height) = (3, 7)

    // prettier-ignore
    const lineCoords = [
        [[0, 3], [3, 3]], // line 0
        [[1.5, 0], [3, 1]], // line 1
        [[3, 5], [1.5, 6]], // line 2
        [[1.5, 6], [0, 5]], // line 3
        [[0, 5], [0, 4]], // line 4
        [[0, 3], [0, 1]], // line 5
        [[0, 1], [1.5, 0]], // line 6
        [[1.5, 0], [1.5, 2]], // line 7
        [[3, 1], [1.5, 2]], // line 8
        [[1.5, 4], [3, 5]], // line 9
        [[1.5, 4], [1.5, 6]], // line 10
        [[1.5, 4], [0, 5]], // line 11
        [[1.5, 2], [0, 1]], // line 12
        [[1.5, 2], [1.5, 3]], // line 13
    ];

    const lineHTML = lineCoords
        .map(([p1, p2], lineIndex) => getRuneLine(p1, p2, lineIndex))
        .join("\n");

    const underringHTML = getRuneUnderring();

    const segmentsHTML = [lineHTML, underringHTML].join("\n");
    return segmentsHTML;
}

function getRuneMaskFromElement(runeElement) {
    let runeMask = 0;

    qsa(".rune-segments-actual > .rune-segment", runeElement).forEach(
        (runeSegment) => {
            const runeSegmentIndex = parseInt(
                runeSegment.getAttribute("rune-segment-index")
            );
            if (runeSegment.classList.contains("rune-segment--active")) {
                runeMask |= 1 << (RUNE_ID_LENGTH - 1 - runeSegmentIndex);
            }
        }
    );

    return runeMask;
}
