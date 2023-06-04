/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    entryPointStrategy: "expand",
    entryPoints: ["input/a.ts", "input/b.ts"],
    out: "output",
    tsconfig: "tsconfig.json",
    readme: "MAIN.md",
    plugin: ["typedoc-plugin-replace-text"],
    replaceText: {
        inCodeCommentText: true,
        inCodeCommentTags: false,
        inIncludedFiles: false,
        replacements: [
            {
                pattern: "REPLACE1",
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- No types in JS, duh...
                replace: () => {
                    return "WAS_REPLACED_BY_FUNCTION";
                },
            },
        ],
    },
};
