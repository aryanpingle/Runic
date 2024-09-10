const RUNE_ID_LENGTH = 15;

const vowelData = [
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

const consonantData = [
    { ipaSymbol: "b", mask: 0b100000010100010, english: "", examples: "" },
    { ipaSymbol: "tʃ", mask: 0b100000000010110, english: "", examples: "" },
    { ipaSymbol: "d", mask: 0b100000010101010, english: "", examples: "" },
    { ipaSymbol: "f", mask: 0b100000001011010, english: "", examples: "" },
    { ipaSymbol: "g", mask: 0b100000001110010, english: "", examples: "" },
    { ipaSymbol: "h", mask: 0b100000010110010, english: "", examples: "" },
    { ipaSymbol: "dʒ", mask: 0b100000010001010, english: "", examples: "" },
    { ipaSymbol: "k", mask: 0b100000011100010, english: "", examples: "" },
    { ipaSymbol: "l", mask: 0b100000010010010, english: "", examples: "" },
    { ipaSymbol: "m", mask: 0b100000000101000, english: "", examples: "" },
    { ipaSymbol: "n", mask: 0b100000000101100, english: "", examples: "" },
    { ipaSymbol: "ŋ", mask: 0b100000011111110, english: "", examples: "" },
    { ipaSymbol: "p", mask: 0b100000001010010, english: "", examples: "" },
    { ipaSymbol: "r", mask: 0b100000011010010, english: "", examples: "" },
    { ipaSymbol: "s", mask: 0b100000011011010, english: "", examples: "" },
    { ipaSymbol: "ʃ", mask: 0b100000001111110, english: "", examples: "" },
    { ipaSymbol: "t", mask: 0b100000001010110, english: "", examples: "" },
    { ipaSymbol: "θ", mask: 0b100000011010110, english: "", examples: "" },
    { ipaSymbol: "ð", mask: 0b100000010111010, english: "", examples: "" },
    { ipaSymbol: "v", mask: 0b100000010100110, english: "", examples: "" },
    { ipaSymbol: "w", mask: 0b100000001000100, english: "", examples: "" },
    { ipaSymbol: "j", mask: 0b100000010010110, english: "", examples: "" },
    { ipaSymbol: "z", mask: 0b100000010110110, english: "", examples: "" },
    { ipaSymbol: "ʒ", mask: 0b100000011101110, english: "", examples: "" },
];

const CONSONANT_MASK = 0b100000011111110;

const MIDDLE_LINE_MASK = 0b100000000000000;

const symbolData = [
    // Blank
    { ipaSymbol: "", mask: 0b000000000000000, english: "", examples: "" },
    // Vowels
    ...vowelData,
    // Consonants
    ...consonantData,
];

function countSetBits(bitstring) {
    let count = 0;
    while (bitstring != 0) {
        count += bitstring % 2;
        bitstring = bitstring >> 1;
    }
    return count;
}

// IMPORTANT: Sort the two symbol-runeId datasets by descending order of active
// segments so that the first "bit-match" by index is the longest (and correct)
// one.
vowelData.sort((a, b) => countSetBits(b[1]) - countSetBits(a[1]));
consonantData.sort((a, b) => countSetBits(b[1]) - countSetBits(a[1]));

// Map from symbol to runeId
const symbolToRuneId = Object.fromEntries(
    symbolData.map(({ ipaSymbol, mask }) => [ipaSymbol, mask])
);
// Map from runeId to symbol
const runeIdToSymbol = Object.fromEntries(
    symbolData.map(({ ipaSymbol, mask }) => [mask, ipaSymbol])
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

function hasValidVowel(runeId) {
    if ((runeId & VOWEL_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeId & VOWEL_MASK) in runeIdToSymbol;
}

function hasValidConsonant(runeId) {
    if ((runeId & CONSONANT_MASK) === MIDDLE_LINE_MASK) {
        // Just the middle line exists, doesn't mean anything
        return true;
    }
    return (runeId & CONSONANT_MASK) in runeIdToSymbol;
}

function extractVowel(runeId) {
    if (!hasValidVowel(runeId)) return null; // Signify invalid combination of vowel segments
    for (const { ipaSymbol, mask: symbolRuneMask } of vowelData) {
        if (containsBitmask(runeId, symbolRuneMask)) return ipaSymbol;
    }
    return ""; // Unreachable
}

function extractConsonant(runeId) {
    if (!hasValidConsonant(runeId)) return null; // Signify invalid combination of consonant segments
    for (const { ipaSymbol, mask: symbolRuneMask } of consonantData) {
        if (containsBitmask(runeId, symbolRuneMask)) return ipaSymbol;
    }
    return ""; // Unreachable
}

/**
 * @param {number} runeId
 */
function getInfoFromRuneId(runeId) {
    const vowel = extractVowel(runeId);
    const consonant = extractConsonant(runeId);
    const vowelBeforeConsonant = runeId % 2 === 1;

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

function getRuneIdFromElement(runeElement) {
    let runeId = 0;

    qsa(".rune-segments-actual > .rune-segment", runeElement).forEach(
        (runeSegment) => {
            const runeSegmentIndex = parseInt(
                runeSegment.getAttribute("rune-segment-index")
            );
            if (runeSegment.classList.contains("rune-segment--active")) {
                runeId |= 1 << (RUNE_ID_LENGTH - 1 - runeSegmentIndex);
            }
        }
    );

    return runeId;
}
