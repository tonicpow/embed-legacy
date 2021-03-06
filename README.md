<img src="https://github.com/tonicpow/embed-legacy/blob/master/images/tonicpow-logo.png?raw=true" height="100" alt="TonicPow">

> Learn more [about TonicPow](https://tonicpow.com/). Checkout the [TonicPow API Docs](https://docs.tonicpow.com).

[![last commit](https://img.shields.io/github/last-commit/tonicpow/embed-legacy.svg?style=flat)](https://github.com/tonicpow/embed-legacy/commits/master)
[![version](https://img.shields.io/github/release-pre/tonicpow/embed-legacy.svg?style=flat)](https://github.com/tonicpow/embed-legacy/releases)
[![Npm](https://img.shields.io/npm/v/tonicpow-embed?style=flat)](https://www.npmjs.com/package/tonicpow-embed)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat)](https://github.com/RichardLitt/standard-readme)
[![slack](https://img.shields.io/badge/slack-tonicpow-orange.svg?style=flat)](https://atlantistic.slack.com/app_redirect?channel=tonicpow)
[![app health](https://img.shields.io/website-up-down-green-red/https/tonicpow.com.svg?label=status)](https://tonicpow.com/)

## Table of Contents
- [Installation](#installation)
- [Documentation](#documentation)
- [Examples](#examples)
- [Code Standards](#code-standards)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Add the script to your web application (using our CDN hosting)
```html
<script src="https://tonicpow.com/tonic.js"></script>
```

_(Optional)_ Get the visitor session
```javascript
let session = window.TonicPow.getVisitorSession()
console.log(session) //1b40c235dd9532213f5d611ffz06f9dd018efeffad8d6fbc35dc421fed18babz
``` 

_(Optional)_ Install as an npm package
```shell script
npm install tonicpow-embed --save
``` 

#### Building (For Developers)
```shell script
npm install
npm run build
```

## Documentation
Read more about the [TonicPow API](https://docs.tonicpow.com) platform.

Check out the [TonicPow embed widget](widget.md) documentation.

<details>
<summary><strong><code>Supported Browsers</code></strong></summary>

TonicPow supports all commonly used browsers. Below is a list of popular browsers and their minimum supported version.
If we're missing a browser, suggest one [via an issue](https://github.com/tonicpow/embed-legacy/issues/new).

|Browser |Platform |Min Version |
|:---|:---|:---|
|Android|Mobile|67.0|
|Bottle|Desktop|0.1|
|Brave|Desktop|55.0|
|Chrome|Desktop|55.0|
|Chrome|Mobile|74.0|
|Edge|Desktop|17.0|
|Firefox|Desktop|52.0|
|Firefox|Mobile|67.0|
|IE|Desktop|---|
|Opera|Desktop|42.0|
|Opera|Mobile|---|
|Safari|Desktop|10.1|
|Safari|Mobile|10.3|
</details>

<details>
<summary><strong><code>Library Deployment</code></strong></summary>

[goreleaser](https://github.com/goreleaser/goreleaser) for easy binary or library deployment to Github and can be installed via: `brew install goreleaser`.

The [.goreleaser.yml](.goreleaser.yml) file is used to configure [goreleaser](https://github.com/goreleaser/goreleaser).

Use `make release-snap` to create a snapshot version of the release, and finally `make release` to ship to production.
</details>

<details>
<summary><strong><code>Makefile Commands</code></strong></summary>

View all `makefile` commands
```shell script
make help
```

List of all current commands:
```text
clean                          Remove previous builds and any test cache data
help                           Show all commands available
release                        Full production release (creates release in Github)
release-test                   Full production test release (everything except deploy)
release-snap                   Test the full release (build binaries)
tag                            Generate a new tag and push (IE: tag version=0.0.0)
tag-remove                     Remove a tag if found (IE: tag-remove version=0.0.0)
tag-update                     Update an existing tag to current commit (IE: tag-update version=0.0.0)
update-releaser                Update the goreleaser application
```
</details>

## Examples
View some [example Tonic widgets](/examples/example.html)

## Code Standards
Always use the language's best practices and don't optimize early :P

## Usage
We are using it! Visit [our website](https://tonicpow.com) to see it in action.

Check out the [Tonic Widgets](https://tonicpow.com/embed.html).

## Maintainers
| [<img src="https://github.com/mrz1836.png" height="50" alt="MrZ" />](https://github.com/mrz1836) | [<img src="https://github.com/rohenaz.png" height="50" alt="Satchmo" />](https://github.com/rohenaz) | [<img src="https://github.com/attilaaf.png" height="50" alt="Atilla" />](https://github.com/attilaaf) |
|:---:|:---:|:---:|
| [MrZ](https://github.com/mrz1836) | [Satchmo](https://github.com/rohenaz) | [Atilla](https://github.com/attilaaf) |
                                                                                                                                                         
Support the development of this project and the [TonicPow](https://tonicpow.com/) team 🙏

## Contributing
Feel free to dive in! [Open an issue](https://github.com/tonicpow/embed-legacy/issues/new) or submit PRs.

## License
[![License](https://img.shields.io/badge/license-Open%20BSV-brightgreen.svg?style=flat)](/LICENSE)
