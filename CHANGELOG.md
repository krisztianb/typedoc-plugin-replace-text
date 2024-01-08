# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.3.0] - 2024-01-06
### Added
-   When using a replacer function one now has access to source information through the function context "this". (see README example)

## [3.2.0] - 2023-09-01
### Added
-   Added support for latest TypeDoc version 0.25.x.

## [3.1.0] - 2023-07-16
### Added
-   The plugin now includes typings for its configuation that you can use in your TypeDoc config. (see Issue #6 on GH)

## [3.0.0] - 2023-06-11
### Breaking Changes
-   Support changed to TypeDoc versions 0.24.8 and above because we need a new TypeDoc event to fix a bug properly.
### Added
-   You can now define a replacer function in your config that is called for each pattern match. (see Issue #4 on GH)
### Fixed
-   Option `inIncludedFiles` is too greedy and overrides the other options when set to `true`. (see Issue #5 on GH)

## [2.2.0] - 2023-04-15
### Changes
-   Added support for latest TypeDoc version 0.24.x.

## [2.1.0] - 2022-10-26
### Changes
-   Option value `inIncludedFiles` now also applies to all included markdown files.

## [2.0.0] - 2022-07-09
### Breaking Changes
-   Support changed to TypeDoc versions 0.23.x due to a breaking change in TypeDoc's API.

## [1.0.0] - 2022-04-07
First release

[unreleased]: https://github.com/krisztianb/typedoc-plugin-replace-text/compare/v3.3.0...HEAD
[3.3.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v3.3.0
[3.2.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v3.2.0
[3.1.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v3.1.0
[3.0.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v3.0.0
[2.2.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v2.2.0
[2.1.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v2.1.0
[2.0.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v2.0.0
[1.0.0]: https://github.com/krisztianb/typedoc-plugin-replace-text/releases/tag/v1.0.0
