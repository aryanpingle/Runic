import { render } from "preact";
import { RuneSVG } from "components/RuneSVG";

async function setup() {
    // Load the dictionary
    const IPA_DICT = await fetch("./ipa_dict.json").then((res) => res.json());

    // Get text from URL query
    const text =
        new URL(window.location.href).searchParams.get("text") || "aryan";

    const lines = text.split("/");
    const translatedLines = lines.map((line) => {
        const words = line.trim().split(" ");
        const translatedWords = words.map((word) =>
            IPA_DICT[word][0].replaceAll(" ", ""),
        );
        return translatedWords.join(" ");
    });
    const translatedText = translatedLines.join("/");

    render(
        <RuneSVG text={translatedText.trim()}></RuneSVG>,
        document.querySelector(".rune-svg-section"),
    );
}
setup();
