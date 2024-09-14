import { render } from "preact";
import { loadIPADict } from "./ipa";
import { RunicEditor } from "components/RunicEditor";

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
