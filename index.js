/**
 * @returns {HTMLElement[]}
 */
function qsa(selector, queryTarget) {
    if (queryTarget === undefined) {
        queryTarget = document;
    }
    return Array.from(queryTarget.querySelectorAll(selector));
}

function setup() {
    document.querySelector("svg").innerHTML = getRune();

    qsa(".rune-segments-hover > .rune-segment").forEach(
        (hoveredRuneSegment) => {
            hoveredRuneSegment.onclick = runeLineClicked;
        }
    );
}
setup();

function runeLineClicked(event) {
    const hoveredRuneSegment = this;
    const runeLineIndex =
        +hoveredRuneSegment.getAttribute("rune-segment-index");
    const selector = `.rune-segments-actual > .rune-segment[rune-segment-index="${runeLineIndex}"]`;
    const actualRuneLine = hoveredRuneSegment
        .closest(".rune")
        .querySelector(selector);
    actualRuneLine.classList.toggle("rune-segment--active");

    const runeMask = getRuneMaskFromElement(document.querySelector(".rune"));
    const info = JSON.stringify(getInfoFromRuneMask(runeMask), undefined, 4)
        .replaceAll("\n", "<br>")
        .replaceAll(" ", "&nbsp;");
    document.querySelector("#result").innerHTML = [runeMask, info].join("<br>");
}
