import { render } from "preact";
import { loadIPADict } from "./ipa";
import { RunicEditor } from "components/RunicEditor";

import "./index.css";
import { RuneReferenceTable } from "components/RuneReference";
import { consonantDataTable, vowelDataTable } from "./runeDataset";
import { RunicPlayground } from "components/RunicPlayground";
import { Testimonials } from "components/Testimonials";
import { addGoldenPathListener } from "./holyCross";

function setTheme() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
        // Dark theme
        document.documentElement.classList.remove("light-theme");
    } else {
        // Light theme
        document.documentElement.classList.add("light-theme");
    }
}

function addThemeListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // Apply the theme
    setTheme();
    // Listen for a theme change
    mediaQuery.addEventListener("change", setTheme);
}

function setup() {
    loadIPADict();

    addThemeListener();

    // Runic Translator
    render(
        <RunicEditor></RunicEditor>,
        document.querySelector(".runic-editor-container"),
    );

    // Vowel Table
    render(
        <RuneReferenceTable table={vowelDataTable}></RuneReferenceTable>,
        document.querySelector("#rune-vowel-table"),
    );

    // Consonant Table
    render(
        <RuneReferenceTable table={consonantDataTable}></RuneReferenceTable>,
        document.querySelector("#rune-consonant-table"),
    );

    // Runic Playground
    render(
        <RunicPlayground />,
        document.querySelector(".runic-playground-container"),
    );

    // Testimonials Section
    render(<Testimonials />, document.querySelector(".testimonials-container"));

    addGoldenPathListener();
}
setup();
