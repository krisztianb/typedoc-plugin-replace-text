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
    /** Should the plugin replace in code comments? */
    inCodeComments?: boolean;

    /** Should the plugin replace in the content of the README.md file? */
    inReadme?: boolean;

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
    /** Should the plugin replace in code comments? */
    private _replaceInCodeComments = true;

    /** Should the plugin replace in the content of the README.md file? */
    private _replaceInReadme = true;

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
            help: "The array with the objects defining the replacement patterns.",
            defaultValue: [],
        });
    }

    /**
     * Reads the values of the plugin options from the application options.
     * @param typedoc The TypeDoc application.
     */
    public readValuesFromApplication(typedoc: Readonly<Application>): void {
        // Yes this type assertion sucks, but there's something wrong with the Type Definitions of TypeDoc
        const config = typedoc.options.getValue("replaceText") as unknown as PluginConfig | undefined;

        if (config) {
            if (config.inCodeComments !== undefined) {
                this._replaceInCodeComments = config.inCodeComments;
            }

            if (config.inReadme !== undefined) {
                this._replaceInReadme = config.inReadme;
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
     * Returns if the plugin should apply the replacements to code comments.
     * @returns True if the plugin should apply the replacements to code comments, otherwise false.
     */
    public get replaceInCodeComments(): boolean {
        return this._replaceInCodeComments;
    }

    /**
     * Returns if the plugin should apply the replacements to the README.md content.
     * @returns True if the plugin should apply the replacements to the README.md content, otherwise false.
     */
    public get replaceInReadme(): boolean {
        return this._replaceInReadme;
    }

    /**
     * Returns the replace information.
     * @returns The replace information.
     */
    public get replacements(): ReplaceInfoWithRegex[] {
        return this._replacements;
    }
}
