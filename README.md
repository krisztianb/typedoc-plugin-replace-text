[![NPM Version](https://badge.fury.io/js/typedoc-plugin-replace-text.svg)](https://badge.fury.io/js/typedoc-plugin-replace-text) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=67UU75EUH4S8A)

# typedoc-plugin-replace-text

This is a plugin for [TypeDoc](https://github.com/TypeStrong/typedoc) that replaces text in the documentation.

This includes:

-   Text in code comments (eg: method descriptions and method parameter descriptions)
-   Text in the main README that is used by TypeDoc
-   Text in [included documents](https://typedoc.org/tags/document/)

You can specify matching patterns and the text they should be replaced with or a replacer function.

This can be useful for:

-   Creating links from ticket IDs (eg: replace "GH-12345" with a link to https://github.com/your-name/the-repo/issues/12345)
-   Creating links from author names (eg: link "Your Name" to your GitHub or corporate profile page)
-   Replacing internal URLs (domains) with external ones
-   Replacing custom placeholders with anything you like (eg: images or content from external files)
-   Removing URLs, user names, passwords or other text from your documentation
-   etc.

## Installation

This module can be installed using [npm](https://www.npmjs.com/package/typedoc-plugin-replace-text):

```sh
$ npm install --save-dev typedoc-plugin-replace-text
```

## Requirements

The plugin requires TypeDoc version 0.26.0 or above to be installed. You need to [activate the plugin with the plugin option](https://typedoc.org/options/configuration/#plugin) in your TypeDoc config.

After installation TypeDoc can be used normally and you can configure this plugin as described below.

## Configuration

Extend your [TypeDoc config file](https://typedoc.org/options/configuration/) with a new option named `replaceText`. Here is an example using a JavaScript config file:

```js
/** @type { import('typedoc').TypeDocOptionMap & import('typedoc-plugin-replace-text').Config } */
module.exports = {
    out: "output",
    entryPointStrategy: "expand",
    entryPoints: ["input/module1.ts", "input/module2.ts"],
    tsconfig: "tsconfig.json",
    readme: "MAIN.md",
    plugin: ["typedoc-plugin-replace-text"],
    replaceText: {
        inCodeCommentText: true,
        inCodeCommentTags: true,
        inMarkdown: false,
        replacements: [
            {
                pattern: "(GH-(\\d+))",
                replace: "[$1](https://github.com/your-name/the-repo/issues/$2)"
            },
            {
                pattern: "King Kong",
                flags: "gi",
                replace: function (match) {
                    if (this.sources?.[0].fileName.endsWith("/king-kong.ts")) {
                        return match + " is home!";
                    }
                    return match + " in another file!";
                },
            },
        ],
    },
};
```

Explanation:

| Property              | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| **inCodeCommentText** | Specifies if the plugin should replace in the text of comments (not including the text of tags like the description of parameters for a method) in your code. (optional - defaults to `true`) |
| **inCodeCommentTags** | Specifies if the plugin should replace in the text of tags (like the description of parameters for a method) in your code comments. (optional - defaults to `true`) |
| **inMarkdown**   | Specifies if the plugin should replace in all Markdown content parsed by TypeDoc (this includes the main README and all MD files added to the documentation). **NOTE:** Since version 0.26 TypeDoc parses all code comments as Markdown too. This means that setting this to `true` will automatically overwrite the other two options above to `true`. (optional - defaults to `true`) |
| **replacements**      | The search patterns and texts they should be replaced with. (`pattern` is the search Regex and `flags` are the optional Regex flags that default to `g`. `replace` can be a string constant or a [replacer function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement) that returns the new text for each match. The replacer function also has access to source information through the function context `this` - see example above where the `sources` property is an array of [TypeDoc SourceReference](https://typedoc.org/api/classes/Models.SourceReference.html) objects.) |

## Bugs

Please report bugs [here](https://github.com/krisztianb/typedoc-plugin-replace-text/issues).
Thanks for your contribution!

## Donate

If you find this piece of software helpful, please consider a donation. Any amount is greatly appreciated.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=67UU75EUH4S8A)
