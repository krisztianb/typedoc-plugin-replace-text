import { Application, Context, Converter } from "typedoc";
import { PluginOptions } from "./plugin_options";

/**
 * The "replace in comments" plugin.
 *
 * # What does it do?
 *
 * This plugin replaces text in comments with other text.
 *
 * # How does it do it?
 *
 * The plugin scans through all comments of all reflections and uses the replacment patterns specified
 * by the user to replace text in these comments.
 */
export class Plugin {
    /** The options of this plugin. */
    private readonly options = new PluginOptions();

    /**
     * Initializes the plugin.
     * @param typedoc The TypeDoc application.
     */
    public initialize(typedoc: Readonly<Application>): void {
        this.options.addToApplication(typedoc);
        this.subscribeToApplicationEvents(typedoc);
    }

    /**
     * Subscribes to events of the application so that the plugin can do its work
     * in the particular doc generation phases.
     * @param typedoc The TypeDoc application.
     */
    private subscribeToApplicationEvents(typedoc: Readonly<Application>): void {
        typedoc.converter.on(Converter.EVENT_BEGIN, (c: Readonly<Context>) => this.onConverterBegin(c));
        typedoc.converter.on(Converter.EVENT_RESOLVE_BEGIN, (c: Readonly<Context>) => this.onConverterResolveBegin(c));
    }

    /**
     * Triggered when the converter begins converting a project.
     * @param context Describes the current state the converter is in.
     */
    public onConverterBegin(context: Readonly<Context>): void {
        this.options.readValuesFromApplication(context.converter.owner);
    }

    /**
     * Triggered when the TypeDoc converter begins resolving a project.
     * @param context Describes the current state the converter is in.
     */
    public onConverterResolveBegin(context: Readonly<Context>): void {
        if (this.options.replacements.length > 0) {
            const project = context.project;

            if (this.options.replaceInReadme && project.readme) {
                project.readme = this.applyReplacements(project.readme);
            }

            if (this.options.replaceInCodeComments) {
                // go through all the reflections' comments
                for (const key in project.reflections) {
                    const reflection = project.reflections[key];

                    if (reflection.comment) {
                        reflection.comment.shortText = this.applyReplacements(reflection.comment.shortText);
                        reflection.comment.text = this.applyReplacements(reflection.comment.text);
                        reflection.comment.tags.forEach((t) => (t.text = this.applyReplacements(t.text)));
                    }
                }
            }
        }
    }

    /**
     * Applies the replacements to the given text.
     * @param text The text on which to apply the replacements.
     * @returns The modified text.
     */
    private applyReplacements(text: string): string {
        this.options.replacements.forEach((r) => (text = text.replace(r.regex, r.replace)));

        return text;
    }
}
