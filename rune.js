const vowels = [
    ["1100111000000000", "æ"],
    ["1111001000000000", "ɑ:"],
    ["1000111000000000", "ɒ"],
    ["1000001000000000", "eɪ"],
    ["1011110000000000", "ɛ"],
    ["1011111000000000", "i:"],
    ["1010111000000000", "ɪəʳ"],
    ["1100001000000000", "ə"],
    ["1010110000000000", "eəʳ"],
    ["1011000000000000", "ɪ"],
    ["1100000000000000", "aɪ"],
    ["1111110000000000", "ɜ:ʳ"],
    ["1111111000000000", "oʊ"],
    ["1001000000000000", "ɔɪ"],
    ["1101111000000000", "u:"],
    ["1001110000000000", "ʊ"],
    ["1010000000000000", "aʊ"],
    ["1110111000000000", "ʊəʳ"],
];

const consonants = [
    ["1000000101000100", "b"],
    ["1000000000101100", "tʃ"],
    ["1000000101010100", "d"],
    ["1000000010110100", "f"],
    ["1000000011100100", "g"],
    ["1000000101100100", "h"],
    ["1000000100010100", "dʒ"],
    ["1000000111000100", "k"],
    ["1000000100100100", "l"],
    ["1000000001010000", "m"],
    ["1000000001011000", "n"],
    ["1000000111111100", "ŋ"],
    ["1000000010100100", "p"],
    ["1000000110100100", "r"],
    ["1000000110110100", "s"],
    ["1000000011111100", "ʃ"],
    ["1000000010101100", "t"],
    ["1000000110101100", "θ"],
    ["1000000101110100", "ð"],
    ["1000000101001100", "v"],
    ["1000000010001000", "w"],
    ["1000000100101100", "j"],
    ["1000000101101100", "z"],
    ["1000000111011100", "ʒ"],
];

const runeIdAndSymbol = [
    // Blank
    ["0000000000000000", ""],
    // Vowels
    ...vowels,
    // Consonants
    ...consonants,
];

const runeIdToSymbol = Object.fromEntries(
    runeIdAndSymbol.map(([id, symbol]) => [id, symbol])
);

const symbolToRuneId = Object.fromEntries(
    runeIdAndSymbol.map(([id, symbol]) => [symbol, id])
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
