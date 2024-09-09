const vowelsAndRuneIds = [
    ["æ", "110011100000000"],
    ["ɑ:", "111100100000000"],
    ["ɒ", "100011100000000"],
    ["eɪ", "100000100000000"],
    ["ɛ", "101111000000000"],
    ["i:", "101111100000000"],
    ["ɪəʳ", "101011100000000"],
    ["ə", "110000100000000"],
    ["eəʳ", "101011000000000"],
    ["ɪ", "101100000000000"],
    ["aɪ", "110000000000000"],
    ["ɜ:ʳ", "111111000000000"],
    ["oʊ", "111111100000000"],
    ["ɔɪ", "100100000000000"],
    ["u:", "110111100000000"],
    ["ʊ", "100111000000000"],
    ["aʊ", "101000000000000"],
    ["ʊəʳ", "111011100000000"],
];

const consonantsAndRuneIds = [
    ["b", "100000010100010"],
    ["tʃ", "100000000010110"],
    ["d", "100000010101010"],
    ["f", "100000001011010"],
    ["g", "100000001110010"],
    ["h", "100000010110010"],
    ["dʒ", "100000010001010"],
    ["k", "100000011100010"],
    ["l", "100000010010010"],
    ["m", "100000000101000"],
    ["n", "100000000101100"],
    ["ŋ", "100000011111110"],
    ["p", "100000001010010"],
    ["r", "100000011010010"],
    ["s", "100000011011010"],
    ["ʃ", "100000001111110"],
    ["t", "100000001010110"],
    ["θ", "100000011010110"],
    ["ð", "100000010111010"],
    ["v", "100000010100110"],
    ["w", "100000001000100"],
    ["j", "100000010010110"],
    ["z", "100000010110110"],
    ["ʒ", "100000011101110"],
];

function countInString(s, query) {
    let count = 0;
    for(let i = 0; i < s.length; ++i) {
        if(s.substring(i).startsWith(query)) ++count;
    }
    return count;
}

// IMPORTANT: Sort the two symbol-runeId datasets by descending order of active
// segments so that the first "bit-match" by index is the longest (and correct)
// one.
vowelsAndRuneIds.sort((a, b) => countInString(b[1], "1") - countInString(a[1], "1"));
consonantsAndRuneIds.sort((a, b) => countInString(b[1], "1") - countInString(a[1], "1"));

// Map from symbol to runeId
const symbolToRuneId = Object.fromEntries(
    [
        // Blank
        ["", "000000000000000"],
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
function matches(bitstring, mask) {
    for(let i = 0; i < bitstring.length; ++i) {
        if(mask.charAt(i) === "0") continue;
        // Now we know mask.charAt(i) === "1"
        if(bitstring.charAt(i) === "0") {
            return false;
        }
    }
    return true;
}

function getFirstMatchingSymbol(runeId, symbolsAndRuneIds) {
    for(const [symbol, runeIdOfSymbol] of symbolsAndRuneIds) {
        if(matches(runeId, runeIdOfSymbol)) return symbol;
    }
    return "";
}

/**
 * @param {string} runeId 
 */
function getInfoFromRuneId(runeId) {
    const vowel = getFirstMatchingSymbol(runeId, vowelsAndRuneIds);
    const consonant = getFirstMatchingSymbol(runeId, consonantsAndRuneIds);
    const vowelBeforeConsonant = runeId.endsWith("1");

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
    const RUNE_ID_LENGTH = 14;
    
    let runeBits = new Array(RUNE_ID_LENGTH + 1).fill(0);

    qsa(".rune-segments-actual > .rune-segment", runeElement).forEach(runeLine => {
        const runeLineIndex = parseInt(runeLine.getAttribute("rune-segment-index"));
        if(runeLine.classList.contains("rune-segment--active")) {
            runeBits[runeLineIndex] = 1;
        }
    });

    const runeId = runeBits.join("");
    return runeId;
}
