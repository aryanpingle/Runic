const fs = require("fs");
const ejs = require("ejs");

const pluginName = "injection-plugin";

function injectFile(type, filepath) {
    const fileContent = fs.readFileSync(filepath).toString().trim();
    switch (type) {
        // JS
        case "js":
            return `<script type="module">${fileContent}</script>`;
        // CSS
        case "css":
            return `<style>${fileContent}</style>`;
        // Plaintext
        case "text":
            return fileContent;
        default:
            throw new Error(
                `${pluginName}: Injection of type "${type}" not supported`,
            );
    }
}

/**
 * @returns {import('esbuild').Plugin}
 */
module.exports.injectionPlugin = function ({ inFile, outFile }) {
    return {
        name: "injection-plugin",
        setup: (build) => {
            build.onEnd(() => {
                const ejsTemplate = fs.readFileSync(inFile).toString();
                const html = ejs.render(ejsTemplate, { injectFile });
                fs.writeFileSync(outFile, html);
            });
        },
    };
};
