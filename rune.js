function getRune() {
    // Order matters
    return `
    <g class="rune">
        <g class="rune-lines-guide">
            ${getRuneLines()}
        </g>
        <g class="rune-lines-actual">
            ${getRuneLines()}
        </g>
        <g class="rune-lines-hover">
            ${getRuneLines()}
        </g>
    </g>
    `
}

function getRuneLines() {
    const lineCoords = [
        [[0, 3], [2, 3]], // line 0
        [[1, 0], [2, 1]], // line 1
        [[2, 5], [1, 6]], // line 2
        [[1, 6], [0, 5]], // line 3
        [[0, 5], [0, 4]], // line 4
        [[0, 3], [0, 1]], // line 5
        [[0, 1], [1, 0]], // line 6
        [[1, 0], [1, 2]], // line 7
        [[2, 1], [1, 2]], // line 8
        [[1, 4], [2, 5]], // line 9
        [[1, 4], [1, 6]], // line 10
        [[1, 4], [0, 5]], // line 11
        [[1, 2], [0, 1]], // line 12
        [[1, 2], [1, 3]], // line 13
    ];

    lineCoords.forEach(coords => {
        coords[0][0] *= 1.5;
        coords[1][0] *= 1.5;
    });

    const lineHTML = lineCoords.map(([p1, p2], lineIndex) => {
        return `
        <line
            class="rune-line"
            rune-line-index="${lineIndex}"
            x1="${p1[0]}"
            y1="${p1[1]}"
            x2="${p2[0]}"
            y2="${p2[1]}"
        >
        </line>`
    }).join("\n")

    return lineHTML;
}