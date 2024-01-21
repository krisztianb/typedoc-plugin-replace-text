/** @type { import('typedoc').TypeDocOptionMap & import('typedoc-plugin-replace-text').Config } */
module.exports = {
    entryPointStrategy: "expand",
    entryPoints: ["input/a.ts"],
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
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                replace: function () {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (this.sources?.[0].fileName !== "a.ts") {
                        throw new Error("Expected to see source code information for the file 'a.ts'");
                    }
                    return "WAS_REPLACED_BY_FUNCTION";
                },
            },
        ],
    },
};
