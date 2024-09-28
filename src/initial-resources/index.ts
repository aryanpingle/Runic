import "./fonts.css";
import "./index.css";

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

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }
}

(function () {
    registerServiceWorker();
    addThemeListener();
})();
