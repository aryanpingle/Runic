/**
 * @returns {HTMLElement[]}
 */
function qsa(selector, queryTarget) {
    if(queryTarget === undefined) {
        queryTarget = document;
    }
    return Array.from(queryTarget.querySelectorAll(selector));
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

    const runeId = getRuneIdFromElement(document.querySelector(".rune"));
    const info = JSON.stringify(getInfoFromRuneId(runeId), undefined, 4).replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;");
    document.querySelector("#result").innerHTML = [runeId, info].join("<br>");
}

const internalArray = [];

function submit() {
    // Get the input text
    const symbol = document.querySelector("input").value;

    internalArray.push([runeId, symbol]);
    console.log(internalArray)
    document.querySelector("#result").innerHTML = JSON.stringify(internalArray)
}
