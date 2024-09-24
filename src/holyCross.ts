// prettier-ignore
const goldenPathDirections = ["South", "South", "North", "West", "East", "East", "West", "North", "East", "South", "South", "North", "West", "East", "West", "South", "North", "East"];

// For debugging
// const goldenPathDirections = ["North", "South", "West", "East"];

const keyToDirection = {
    ArrowUp: "North",
    ArrowDown: "South",
    ArrowLeft: "West",
    ArrowRight: "East",
};

let goldenPathIndex = 0;
let goldenPathComplete = false;

function onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Check if an arrow key was pressed
    if (!(key in keyToDirection)) {
        // Arrow key was not pressed
        goldenPathIndex = 0;
        return;
    } else {
        // Arrow key was pressed

        // Prevent multiple golden path rewards
        if (goldenPathComplete) return;

        const directionPressed = keyToDirection[key];

        // Check if the correct key was pressed
        if (goldenPathDirections[goldenPathIndex] !== directionPressed) {
            // Wrong key was pressed
            console.log("WRONG");
            goldenPathIndex = 0;
            return;
        } else {
            // Correct arrow key pressed
            ++goldenPathIndex;

            if (goldenPathIndex === goldenPathDirections.length) {
                // Golden path has been travelled!
                goldenPathComplete = true;
                onGoldenPathTravelled();
            }
        }
    }
}

function onGoldenPathTravelled() {
    // TODO: Do something cool
    console.log("GOLDEN PATH TRAVELLED!");
}

export function addGoldenPathListener() {
    document.addEventListener("keydown", onKeyDown);
}
