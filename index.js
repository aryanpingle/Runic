/**
 * @returns {HTMLElement[]}
 */
function qsa(...args) {
    return Array.from(document.querySelectorAll(...args));
}

function setup() {
    document.querySelector("svg").innerHTML = getRune();

    qsa(".rune-lines-hover > .rune-line").forEach(hoveredRuneLine => {
        hoveredRuneLine.onclick = function(event) {
            const runeLineIndex = +(hoveredRuneLine.getAttribute("rune-line-index"));
            const selector = `.rune-lines-actual > .rune-line[rune-line-index="${runeLineIndex}"]`;
            const actualRuneLine = hoveredRuneLine.closest(".rune").querySelector(selector);
            actualRuneLine.classList.toggle("rune-line--active");
        }
    })
}
setup();

const internalArray = [];

function submit() {
    const RUNE_ID_LENGTH = 14;
    let runeBits = new Array(RUNE_ID_LENGTH + 1).fill(0);
    qsa(".rune-lines-actual > .rune-line").forEach(runeLine => {
        const runeLineIndex = parseInt(runeLine.getAttribute("rune-line-index"));
        if(runeLine.classList.contains("rune-line--active")) {
            runeBits[runeLineIndex] = 1;
        }
    });
    const runeId = runeBits.join("");

    // Get the input text
    const symbol = document.querySelector("input").value;

    internalArray.push([runeId, symbol]);
    console.log(internalArray)
    document.querySelector("#result").innerHTML = JSON.stringify(internalArray)
}

// [["110011100000000","æ"],["111100100000000","ɑ:"],["100011100000000","ɒ"],["100000100000000","eɪ"],["101111000000000","ɛ"],["101111100000000","i:"],["101011100000000","ɪəʳ"],["110000100000000","ə"],["101011000000000","eəʳ"],["101100000000000","ɪ"],["110000000000000","aɪ"],["111111000000000","ɜ:ʳ"],["111111100000000","oʊ"],["100100000000000","ɔɪ"],["110111100000000","u:"],["100111000000000","ʊ"],["101000000000000","aʊ"],["111011100000000","ʊəʳ"]]
