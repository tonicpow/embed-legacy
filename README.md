<img src="https://github.com/tonicpow/embed/blob/master/images/tonicpow-logo.png" height="100" alt="TonicPow">

View a [Tonic in action](https://tonicpow.com/?affiliate=$tonicpow). Checkout the [Tonic protocol](/PROTOCOL.md).

[![last commit](https://img.shields.io/github/last-commit/tonicpow/embed.svg?style=flat)](https://github.com/tonicpow/embed/commits/master)
[![version](https://img.shields.io/github/release-pre/tonicpow/embed.svg?style=flat)](https://github.com/tonicpow/embed/releases)
[![license](https://img.shields.io/badge/license-Open%20BSV-brightgreen.svg?style=flat)](/LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat)](https://github.com/RichardLitt/standard-readme)
[![app health](https://img.shields.io/website-up-down-green-red/https/faucet.allaboard.cash.svg?label=status)](https://tonicpow.com/?affiliate=$tonicpow)

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
1. Add the script to your site.
```html
<script src="https://tonicpow.com/tonic.js"></script>
```

2. Replace `data-address` with your BSV address and place the tag wherever it will be displayed.
```html
<div class="tonic" data-address="YOUR_ADDRESS"></div>
```

_(Optional)_ Use your [$handcash](https://handcash.io/?affiliate=$tonicpow) handle in place of your wallet address
```html
<div class="tonic" data-handcash="$your-handle"></div>
``` 

_(Optional)_ Use your [RelayX 1handle](https://relayx.io/?affiliate=$tonicpow) in place of your wallet address
```html
<div class="tonic" data-relayx="1your-handle"></div>
``` 

## Building
```bash
$ npm install
$ npm run build
```

## Documentation
Checkout our nifty [Tonic generator](https://tonicpow.com/?affiliate=$tonicpow).

This Tonic embed works in relation to the [Tonic protocol](/PROTOCOL.md).

Required attributes are one of the following: `data-address` or `data-handcash` or `data-relayx`

|Attribute |Example |Supported |Description |
|:---|:---|:---|:---|
|data-address|1BrwAE...|**Yes**|Your bitcoin sv wallet address.|
|data-handcash|$tonicpow|**Yes**|Your [$handcash](https://handcash.io/?affiliate=$tonicpow) handle. Used in place of data-address. |
|data-relayx|1tonicpow|**Yes**|Your [RelayX 1handle](https://relayx.io/?affiliate=$tonicpow). Used in place of data-address. |
|data-unit-id|embed-1|**Yes**|To show multiple units on one page, set each to a unique identifier of your choice.|
|data-rate|546|**Yes**|Set the rate of sats per block. The default is 546.|
|data-currency|bsv|_Not yet_|Set the currency rate (bsv or usd)|
|data-width|300|**Yes**|Set a custom width. The default is 300px. Minimum is 160x|
|data-height|250|**Yes**|Set a custom height. The default and minimum is 250px; There is an additional 22px footer.|
|data-image|https://...|_Not yet_|Default image url if no ad is present||
|data-link-color|#FFF|**Yes**|Change the link color via CSS value (#007bff)|
|data-funding|true|_Not yet_|Toggle funding campaigns, default is true (on)|

#### Handcash Support
This Tonic embed script converts [$handcash](https://handcash.io/?affiliate=$tonicpow) handles to wallet addresses on-the-fly when loading.
You can supply a [$handcash](https://handcash.io/?affiliate=$tonicpow) handle via `data-handcash`.

#### RelayX 1handle Support
This Tonic embed script converts [RelayX 1handles](https://relayx.io/?affiliate=$tonicpow) to wallet addresses on-the-fly when loading.
You can supply a [1handle](https://relayx.io/?affiliate=$tonicpow) handle via `data-relayx`.

#### Supported Browsers
TonicPow supports all commonly used browsers. Below is a list of popular browsers and their minimum supported version.
If we're missing a browser, suggest one [via an issue](https://github.com/tonicpow/embed/issues/new).

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


#### Bitcoin Sticker Protocol Support
Using the [bitcoin sticker protocol](https://sticker.planaria.network/?affiliate=$tonicpow), it ensures that any embed that is missing a `data-address` will use sticker address.

In the future this will be used for tipping, likes, sharing, etc.

#### Affiliates
If you share any url and append `?affiliate=$your-handle` or `?affiliate=1your-handle` the embed will process your handle and store it associated to all ads on the page.

If you don't have a [$handcash](https://handcash.io/?affiliate=$tonicpow) handle or a [1handle](https://relayx.io/?affiliate=$tonicpow) you can provide your [bsv wallet address](https://en.bitcoin.it/wiki/Address)  `?affiliate=1BrwAE2qg6qBaB2n...`. 

The affiliate/publisher relationship is stored in user's local session for future visits. 


## Examples

#### Demo Tonics
View the [interactive live demo ads](https://tonicpow.com/?affiliate=$tonicpow) and [more examples here](/example.html)

#### Affiliate
Replace `$your-handle` with your [$handcash](https://handcash.io/?affiliate=$tonicpow) handle or your [1handle](https://relayx.io/?affiliate=$tonicpow) or [bsv wallet address](https://en.bitcoin.it/wiki/Address) and share!
Receive a payment if an Ad is purchased using your affiliate link. Any website that uses [TonicPow](https://tonicpow.com/?affiliate=$tonicpow) supports the [$handcash](https://handcash.io/?affiliate=$tonicpow) affiliate functionality.
```
https://tonicpow.com/?affiliate=$your-handle

https://some-website.com/?affiliate=$your-handle 

https://some-website.com/?affiliate=1your-handle

https://some-website.com/?affiliate=1BrwAE2qg6qBaB2n...
```

## Code Standards
- Always use the language's best practices!

## Usage
- Setup your own Tonic using the [Tonic generator](https://tonicpow.com/?affiliate=$tonicpow) or [above installation](#installation).

## Maintainers
[Attila](https://github.com/attilaaf?affiliate=$attila) - [Satchmo](https://github.com/rohenaz?affiliate=$satchmo) - [MrZ](https://github.com/mrz1836?affiliate=$mr-z)

Support the development of this project and the [TonicPow](https://tonicpow.com/?affiliate=$tonicpow) team 🙏

## Contributing
Feel free to dive in! [Open an issue](https://github.com/tonicpow/embed/issues/new) or submit PRs.

## License
[![License](https://img.shields.io/badge/license-Open%20BSV-brightgreen.svg?style=flat)](/LICENSE)
