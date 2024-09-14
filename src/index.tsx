import { render } from "preact";
import { RuneSVG } from "components/RuneSVG";
import { translateWord, loadIPADict, translateSentence } from "./ipa";
import { RunicEditor } from "components/RunicTranslator";

import "./index.css";
import { RuneReference } from "components/RuneReference";

async function setup() {
    await loadIPADict();

    render(
        <RunicEditor></RunicEditor>,
        document.querySelector(".runic-editor-container"),
    );

    render(
        <RuneReference></RuneReference>,
        document.querySelector(".rune-references-container"),
    );
}
setup();
