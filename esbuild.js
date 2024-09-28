const { copy: esbuildPluginCopy } = require("esbuild-plugin-copy");
const esbuild = require("esbuild");
const {
    esbuildProblemMatcherPlugin,
} = require("./plugins/esbuildProblemMatchersPlugin");
const { injectInitialScriptPlugin } = require("./plugins/injectInitialScript");

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

async function main() {
    const contexts = [];
    // Build the visualization webview code
    contexts.push(
        await esbuild.context({
            entryPoints: ["src/index.tsx", "src/initial-script.ts"],
            bundle: true,
            format: "esm",
            target: "es2020",
            minify: production,
            sourcesContent: false,
            outdir: "./dist/bundle",
            metafile: true,
            logLevel: "silent",
            alias: {
                react: "preact/compat",
            },
            plugins: [
                esbuildPluginCopy({
                    // Resolve relative to the current working directory
                    resolveFrom: "cwd",
                    assets: [
                        {
                            from: ["./public/**/*"],
                            to: ["./dist"],
                            watch: watch,
                        },
                    ],
                }),
                injectInitialScriptPlugin,
                /* add to the end of plugins array */
                esbuildProblemMatcherPlugin,
            ],
        }),
    );
    // Build the service worker
    contexts.push(
        await esbuild.context({
            entryPoints: ["src/service-worker.ts"],
            bundle: true,
            format: "esm",
            target: "es2020",
            minify: production,
            sourcesContent: false,
            outdir: "./dist",
            logLevel: "silent",
            plugins: [
                /* add to the end of plugins array */
                esbuildProblemMatcherPlugin,
            ],
            allowOverwrite: true,
        }),
    );

    if (watch) {
        await Promise.allSettled(contexts.map((context) => context.watch()));
    } else {
        await Promise.allSettled(
            contexts.map((context) => context.rebuild().then(context.dispose)),
        );
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
