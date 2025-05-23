import {
    type Application,
    type CommentDisplayPart,
    type Context,
    Converter,
    MarkdownEvent,
    type SourceReference,
} from "typedoc";
import { PluginOptions } from "./plugin_options.js";
import { hasSources } from "./utils.js";

/**
 * The "Replace Text" plugin.
 *
 * # What does it do?
 *
 * This plugin replaces text in the documentation with other text.
 *
 * # How does it do it?
 *
 * The plugin scans through all comments of all reflections and uses the replacment patterns specified by the user.
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
        typedoc.converter.on(Converter.EVENT_BEGIN, (c: Readonly<Context>) => {
            this.onTypeDocConverterBegin(c);
        });
        typedoc.converter.on(Converter.EVENT_RESOLVE_BEGIN, (c: Readonly<Context>) => {
            this.onTypeDocConverterResolveBegin(c);
        });

        typedoc.renderer.on(
            MarkdownEvent.PARSE,
            (e: MarkdownEvent) => {
                this.onTypeDocMarkdownParse(e);
            },
            100, // this makes sure that our event handler is called before TypeDoc converts the markdown content
        );
    }

    /**
     * Triggered when the TypeDoc converter begins converting a project.
     * @param context Describes the current state the TypeDoc converter is in.
     */
    public onTypeDocConverterBegin(context: Readonly<Context>): void {
        this.options.readValuesFromTypeDocApplication(context.converter.owner);
    }

    /**
     * Triggered when the TypeDoc converter begins resolving a project.
     * @param context Describes the current state the TypeDoc converter is in.
     */
    public onTypeDocConverterResolveBegin(context: Readonly<Context>): void {
        if (!this.hasSomethingTodo) {
            return;
        }

        const project = context.project;

        // go through all the reflections' comments
        for (const key in project.reflections) {
            const reflection = project.reflections[key];

            if (reflection.comment) {
                const sources = hasSources(reflection) ? (reflection.sources ?? []) : undefined;

                if (this.options.replaceInCodeCommentText) {
                    this.applyReplacementsToCommentParts(reflection.comment.summary, sources);
                }
                if (this.options.replaceInCodeCommentTags) {
                    reflection.comment.blockTags.forEach((tag) => {
                        this.applyReplacementsToCommentParts(tag.content, sources);
                    });
                }
            }
        }
    }

    /**
     * Triggered when the TypeDoc renderer parses Markdown.
     * @param event Markdown event information.
     */
    public onTypeDocMarkdownParse(event: MarkdownEvent): void {
        if (!this.hasSomethingTodo) {
            return;
        }

        if (this.options.replaceInMarkdown) {
            event.parsedText = this.applyReplacementsToString(event.parsedText);
        }
    }

    /**
     * Checks if the plugin is configured in a way that it has something to do.
     * @returns True, if the plugin has something to do, otherwise false.
     */
    private get hasSomethingTodo(): boolean {
        const shouldReplaceSomething =
            this.options.replaceInCodeCommentText ||
            this.options.replaceInCodeCommentTags ||
            this.options.replaceInMarkdown;

        return shouldReplaceSomething && this.options.replacements.length > 0;
    }

    /**
     * Applies the replacements to the given text parts.
     * @param parts The text parts on which to apply the replacements.
     * @param sources Information about the source of the comment parts.
     */
    private applyReplacementsToCommentParts(parts: CommentDisplayPart[], sources?: SourceReference[]): void {
        parts.forEach((part) => {
            part.text = this.applyReplacementsToString(part.text, sources);
        });
    }

    /**
     * Applies the replacements to the given string.
     * @param str The string on which to apply the replacements.
     * @param sources Information about the source of the string.
     * @returns The string with the replacements applied to it.
     */
    private applyReplacementsToString(str: string, sources?: SourceReference[]): string {
        let result = str;

        for (const replacement of this.options.replacements) {
            result =
                typeof replacement.replace === "string"
                    ? result.replace(replacement.regex, replacement.replace)
                    : result.replace(replacement.regex, replacement.replace.bind({ sources }));
        }

        return result;
    }
}
