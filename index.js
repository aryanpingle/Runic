/**
 * @returns {HTMLElement[]}
 */
function qsa(...args) {
    return Array.from(document.querySelectorAll(...args));
}

function setup() {
    document.querySelector("svg").innerHTML = getRune();

    qsa(".rune-segments-hover > .rune-segment").forEach(hoveredRuneSegment => {
        hoveredRuneSegment.onclick = runeLineClicked;
    })
}
setup();

function runeLineClicked(event) {
    const hoveredRuneSegment = this;
    const runeLineIndex = +(hoveredRuneSegment.getAttribute("rune-segment-index"));
    const selector = `.rune-segments-actual > .rune-segment[rune-segment-index="${runeLineIndex}"]`;
    const actualRuneLine = hoveredRuneSegment.closest(".rune").querySelector(selector);
    actualRuneLine.classList.toggle("rune-segment--active");
}

const internalArray = [];

function submit() {
    const RUNE_ID_LENGTH = 14;
    let runeBits = new Array(RUNE_ID_LENGTH + 1).fill(0);
    qsa(".rune-segments-actual > .rune-segment").forEach(runeLine => {
        const runeLineIndex = parseInt(runeLine.getAttribute("rune-segment-index"));
        if(runeLine.classList.contains("rune-segment--active")) {
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
