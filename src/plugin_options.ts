import { Application, ParameterType } from "typedoc";

/**
 * Extend typedoc's options with the plugin's option using declaration merging.
 */
declare module "typedoc" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- This is not a separate type.
    export interface TypeDocOptionMap {
        replaceText: PluginConfig;
    }
}

/**
 * A type for the options of the plugin.
 */
type PluginConfig = {
    /** Should the plugin replace in the text of code comments? */
    inCodeCommentText?: boolean;

    /** Should the plugin replace in the text of code comment tags? */
    inCodeCommentTags?: boolean;

    /** Should the plugin replace in the content of the README.md file? */
    inIncludedFiles?: boolean;

    /** The objects describing what and with what it should be replaced. */
    replacements?: ReplaceInfoFromConfig[];
};

/**
 * A type describing what should be replaced by what as it is defined by the user in the config.
 */
type ReplaceInfoFromConfig = {
    /** The regular expression pattern used to find the text that should be replaced. */
    pattern: string;

    /** Flags for the regular expression pattern. */
    flags?: string;

    /** The text that should be used as a replacement. */
    replace: string;
};

/**
 * A type describing what should be replaced by what using a regular expression.
 */
type ReplaceInfoWithRegex = {
    /** The regular expression object used to find the text that should be replaced. */
    regex: RegExp;

    /** The text that should be used as a replacement. */
    replace: string;
};

/**
 * Class storing the options of the plugin.
 */
export class PluginOptions {
    /** Should the plugin replace in the text of code comments? */
    private _replaceInCodeCommentText = true;

    /** Should the plugin replace in the text of code comment tags? */
    private _replaceInCodeCommentTags = true;

    /** Should the plugin replace in the content of the README.md file? */
    private _replaceInIncludedFiles = true;

    /** The replace information. */
    private _replacements: ReplaceInfoWithRegex[] = [];

    /**
     * Adds the command line options of the plugin to the TypeDoc application.
     * @param typedoc The TypeDoc application.
     */
    // eslint-disable-next-line class-methods-use-this
    public addToApplication(typedoc: Readonly<Application>): void {
        typedoc.options.addDeclaration({
            type: ParameterType.Mixed,
            name: "replaceText",
            help: "The configuration object of the replace-text plugin.",
            defaultValue: {},
        });
    }

    /**
     * Reads the values of the plugin options from the application options.
     * @param typedoc The TypeDoc application.
     */
    public readValuesFromApplication(typedoc: Readonly<Application>): void {
        // Yes, this type assertion sucks, but there's something wrong with the Type Definitions of TypeDoc
        const config = typedoc.options.getValue("replaceText") as unknown as PluginConfig | undefined;

        if (config) {
            if (config.inCodeCommentText !== undefined) {
                this._replaceInCodeCommentText = config.inCodeCommentText;
            }

            if (config.inCodeCommentTags !== undefined) {
                this._replaceInCodeCommentTags = config.inCodeCommentTags;
            }

            if (config.inIncludedFiles !== undefined) {
                this._replaceInIncludedFiles = config.inIncludedFiles;
            }

            if (Array.isArray(config.replacements)) {
                // Convert patterns and flags to regular expressions and cache them
                this._replacements = config.replacements.map((x) => {
                    return { regex: new RegExp(x.pattern, x.flags ?? "g"), replace: x.replace };
                });
            }
        }
    }

    /**
     * Returns if the plugin should apply the replacements to the text of code comments.
     * @returns True if the plugin should apply the replacements to the text of code comments, otherwise false.
     */
    public get replaceInCodeCommentText(): boolean {
        return this._replaceInCodeCommentText;
    }

    /**
     * Returns if the plugin should apply the replacements to the text of code comment tags.
     * @returns True if the plugin should apply the replacements to the text of code comment tags, otherwise false.
     */
    public get replaceInCodeCommentTags(): boolean {
        return this._replaceInCodeCommentTags;
    }

    /**
     * Returns if the plugin should apply the replacements to the README.md content.
     * @returns True if the plugin should apply the replacements to the README.md content, otherwise false.
     */
    public get replaceInIncludedFiles(): boolean {
        return this._replaceInIncludedFiles;
    }

    /**
     * Returns the replace information.
     * @returns The replace information.
     */
    public get replacements(): ReplaceInfoWithRegex[] {
        return this._replacements;
    }
}
