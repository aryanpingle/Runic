const RUNE_ID_LENGTH = 15;

const vowelsAndRuneIds = [
    ["æ", 0b110011100000000],
    ["ɑ:", 0b111100100000000],
    ["ɒ", 0b100011100000000],
    ["eɪ", 0b100000100000000],
    ["ɛ", 0b101111000000000],
    ["i:", 0b101111100000000],
    ["ɪəʳ", 0b101011100000000],
    ["ə", 0b110000100000000],
    ["eəʳ", 0b101011000000000],
    ["ɪ", 0b101100000000000],
    ["aɪ", 0b110000000000000],
    ["ɜ:ʳ", 0b111111000000000],
    ["oʊ", 0b111111100000000],
    ["ɔɪ", 0b100100000000000],
    ["u:", 0b110111100000000],
    ["ʊ", 0b100111000000000],
    ["aʊ", 0b101000000000000],
    ["ʊəʳ", 0b111011100000000],
];

const consonantsAndRuneIds = [
    ["b", 0b100000010100010],
    ["tʃ", 0b100000000010110],
    ["d", 0b100000010101010],
    ["f", 0b100000001011010],
    ["g", 0b100000001110010],
    ["h", 0b100000010110010],
    ["dʒ", 0b100000010001010],
    ["k", 0b100000011100010],
    ["l", 0b100000010010010],
    ["m", 0b100000000101000],
    ["n", 0b100000000101100],
    ["ŋ", 0b100000011111110],
    ["p", 0b100000001010010],
    ["r", 0b100000011010010],
    ["s", 0b100000011011010],
    ["ʃ", 0b100000001111110],
    ["t", 0b100000001010110],
    ["θ", 0b100000011010110],
    ["ð", 0b100000010111010],
    ["v", 0b100000010100110],
    ["w", 0b100000001000100],
    ["j", 0b100000010010110],
    ["z", 0b100000010110110],
    ["ʒ", 0b100000011101110],
];

function countSetBits(bitstring) {
    let count = 0;
    while(bitstring != 0) {
        count += bitstring % 2;
        bitstring = bitstring >> 1;
    }
    return count;
}

// IMPORTANT: Sort the two symbol-runeId datasets by descending order of active
// segments so that the first "bit-match" by index is the longest (and correct)
// one.
vowelsAndRuneIds.sort((a, b) => countSetBits(b[1]) - countSetBits(a[1]));
consonantsAndRuneIds.sort((a, b) => countSetBits(b[1]) - countSetBits(a[1]));

// Map from symbol to runeId
const symbolToRuneId = Object.fromEntries(
    [
        // Blank
        ["", 0b000000000000000],
        // Vowels
        ...vowelsAndRuneIds,
        // Consonants
        ...consonantsAndRuneIds,
    ].map(([symbol, id]) => [symbol, id])
);

function getRune(symbol = "") {
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

function getFirstMatchingSymbol(runeId, symbolsAndRuneIds) {
    for(const [symbol, runeIdOfSymbol] of symbolsAndRuneIds) {
        if(containsBitmask(runeId, runeIdOfSymbol)) return symbol;
    }
    return "";
}

/**
 * @param {number} runeId 
 */
function getInfoFromRuneId(runeId) {
    const vowel = getFirstMatchingSymbol(runeId, vowelsAndRuneIds);
    const consonant = getFirstMatchingSymbol(runeId, consonantsAndRuneIds);
    console.log("vowel matched, ", runeId.toString(2), vowel, symbolToRuneId[vowel].toString(2))
    const vowelBeforeConsonant = (runeId % 2) === 1;

    return {
        vowel,
        consonant,
        vowelBeforeConsonant
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

    const segmentsHTML = [lineHTML, underringHTML].join("\n")
    return segmentsHTML;
}

function getRuneIdFromElement(runeElement) {
    let runeId = 0;
    
    qsa(".rune-segments-actual > .rune-segment", runeElement).forEach(runeSegment => {
        const runeSegmentIndex = parseInt(runeSegment.getAttribute("rune-segment-index"));
        if(runeSegment.classList.contains("rune-segment--active")) {
            runeId |= 1 << (RUNE_ID_LENGTH - 1 - runeSegmentIndex);
        }
    });

    return runeId;
}
