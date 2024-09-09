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
