[![NPM Version](https://badge.fury.io/js/typedoc-plugin-replace-text.svg)](https://badge.fury.io/js/typedoc-plugin-replace-text) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=67UU75EUH4S8A)

# typedoc-plugin-replace-text

This is a plugin for [TypeDoc](https://github.com/TypeStrong/typedoc) that replaces text in the documentation.

This includes:

-   Text in code comments
-   Text in the README

You can specify matching patterns and the text they should be replaced with.

This can be useful for:

-   Creating links from ticket IDs (eg: replace "GH-12345" with a link to https://github.com/your-name/the-repo/issues/12345)
-   Creating links from author names (eg: link "Your Name" to your GitHub or corporate profile page)
-   Replacing internal URLs with external ones
-   Replacing custom placeholders with anything you like (eg: images)
-   Remove URLs or other text
-   etc.

## Installation

This module can be installed using [npm](https://www.npmjs.com/package/typedoc-plugin-replace-text):

```sh
$ npm install typedoc-plugin-replace-text --save-dev
```

TypeDoc automatically detects plugins installed via npm. After installation TypeDoc can be used normally and you can
configure this plugin as described below.

### Requirements

The plugin requires TypeDoc version 0.21.x or 0.22.x to be installed.

## Configuration

Extend your [TypeDoc config file](https://typedoc.org/guides/options/) with a new option named `replaceText`. The option is defined as an object that looks like this:

```json
"replaceText": {
    "inCodeComments": true,
    "inReadme": true,
    "replacements": [
        {
            "pattern": "(GH-(\\d+))",
            "replace": "[$1](https://github.com/your-name/the-repo/issues/$2)"
        },
        {
            "pattern": "King Kong",
            "flags": "gi",
            "replace": "[King Kong](https://github.com/king-kong)"
        }
    ]
}
```

Explanation:

| Property           | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| **inCodeComments** | Specifies if the plugin should replace in code comments. (optional - defaults to `true`) |
| **inReadme**       | Specifies if the plugin should replace in your README file. (optional - defaults to `true`) |
| **replacements**   | The search patterns and texts they should be replaced with. (`pattern` is the search Regex, `flags` are the optional Regex flags that default to `g` and `replace` is the inserted text) |

## Bugs

Please report bugs [here](https://github.com/krisztianb/typedoc-plugin-replace-text/issues).
Thanks for your contribution!

## Donate

If you find this piece of software helpful, please consider a donation. Any amount is greatly appreciated.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=67UU75EUH4S8A)
