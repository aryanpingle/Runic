import "./index.css";
import "./fonts.css";

function getManifestLinkElement(): HTMLLinkElement {
    const query = document.head.querySelector(`link[rel="manifest"]`) as HTMLLinkElement;
    if(query) return query;

    // Create the link element
    const element = document.createElement("link");
    element.rel = "manifest";
    document.head.appendChild(element);
    
    return element;
}

function setTheme() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
        // Dark theme
        document.documentElement.classList.remove("light-theme");
        // Set manifest
        const element = getManifestLinkElement();
        element.setAttribute("href", "manifest-dark.json");
    } else {
        // Light theme
        document.documentElement.classList.add("light-theme");
        // Set manifest
        const element = getManifestLinkElement();
        element.setAttribute("href", "manifest-light.json");
    }
}

function addThemeListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // Apply the theme
    setTheme();
    // Listen for a theme change
    mediaQuery.addEventListener?.("change", setTheme);
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
