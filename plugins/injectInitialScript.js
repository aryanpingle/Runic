const fs = require("fs");

const injectionRegex = /<!-- inject:initial-script -->/;

/**
 * @type {import('esbuild').Plugin}
 */
module.exports.injectInitialScriptPlugin = {
    name: "inject-initial-script-plugin",
    setup: (build) => {
        build.onEnd((result) => {
            const html = fs.readFileSync("./public/index.html").toString();
            const initialScript = fs
                .readFileSync("./dist/bundle/initial-script.js")
                .toString()
                .trim();
            const injection = `<script type="module">${initialScript}</script>`;
            fs.writeFileSync(
                "./dist/index.html",
                html.replace(injectionRegex, injection),
            );
        });
    },
};
