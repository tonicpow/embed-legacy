<img src="https://github.com/tonicpow/embed/blob/master/images/tonicpow-logo.png" height="100">

View a [Tonic in action](https://tonicpow.com/?affiliate=$tonicpow). Checkout the [Tonic protocol](https://github.com/tonicpow/embed/blob/master/PROTOCOL.md).

![last commit](https://img.shields.io/github/last-commit/tonicpow/embed.svg)
![version](https://img.shields.io/github/release/tonicpow/embed.svg)
![license](https://img.shields.io/github/license/tonicpow/embed.svg?style=flat)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat)](https://github.com/RichardLitt/standard-readme)
[![app health](https://img.shields.io/website-up-down-green-red/https/faucet.allaboard.cash.svg?label=status)](https://tonicpow.com/?affiliate=$tonicpow)

## Table of Contents
- [Installation](https://github.com/tonicpow/embed#installation)
- [Documentation](https://github.com/tonicpow/embed#documentation)
- [Examples](https://github.com/tonicpow/embed#examples)
- [Code Standards](https://github.com/tonicpow/embed#code-standards)
- [Usage](https://github.com/tonicpow/embed#usage)
- [Maintainers](https://github.com/tonicpow/embed#maintainers)
- [Contributing](https://github.com/tonicpow/embed#contributing)
- [License](https://github.com/tonicpow/embed#license)

## Installation
1. Add the script to your site.
```html
<script src="https://tonicpow.com/tonic.js"></script>
```

2. Add this tag wherever it will be displayed.
```html
<div class="tonic" data-pubkey="YOUR_PUBKEY"></div>
```

## Documentation
Full documentation and a script generator can be [found here](https://tonicpow.com/?affiliate=$tonicpow).

Required attributes are one of the following: `data-pubkey` or `data-handcash`

|Attribute |Example |Supported |Description |
|:---|:---|:---|:---|
|data-pubkey|1BrwAE...|**Yes**|Your bitcoin wallet pubkey address.|
|data-handcash|$tonicpow|**Yes**|Your $handcash handle. Used in place of data-pubkey. |
|data-relayx|1tonicpow|_No_|Your RelayX 1handle. Used in place of data-pubkey. |
|data-unit-id|embed-1|**Yes**|To show multiple units on one page, set each to a unique identifier of your choice.|
|data-rate|546|**Yes**|Set the rate of sats per block. The default is 546.|
|data-currency|bsv|_No_|Set the currency rate (bsv or usd)|
|data-width|300|_No_|Set a custom width. The default is 300px.|
|data-height|250|_No_|Set a custom height. The default is 250px; There is an additional 22px footer.|
|data-state|create|**Yes**|Used to load custom tonic state|
|data-image|https://...|_No_|Default image url if no ad is present|
|data-bg-color|#000|_No_|Change the background color via CSS value (#FFF)|
|data-link-color|#FFF|_No_|Change the link color via CSS value (#007bff)|
|data-funding|true|_No_|Toggle funding campaigns, default is true (on)|

#### Handcash Support
This embed script converts [$handcash](https://handcash.io/) handles to wallet addresses on-the-fly when loading.
You can supply a [$handcash](https://handcash.io/) handle via `data-handcash` or wallet address via `data-pubkey`.

#### Bitcoin Sticker Protocol Support
Using the [bitcoin sticker protocol](https://sticker.planaria.network/), this embed forwards the address or transaction of 
the current page for future use. (IE: tips, likes, etc) 

#### Affiliates
If you share any url and append `?affiliate=$your-handle` the embed will process your [$handcash](https://handcash.io/) handle and store it associated to all ads on the page.
If you don't have [$handcash](https://handcash.io/) you can provide your [bsv wallet address](https://en.bitcoin.it/wiki/Address)  `?affiliate=1BrwAE2qg6qBaB2n...`. 
The affiliate/publisher relationship is stored in user's local session for future visits. 


## Examples

#### Demo Ads
View the [interactive live demo ads](https://tonicpow.com/?affiliate=$tonicpow) and [more examples here](https://github.com/tonicpow/embed/blob/master/example.html)

#### Affiliate
Replace `$your-handle` with your [$handcash](https://handcash.io/) handle or [bsv wallet address](https://en.bitcoin.it/wiki/Address) and share!
Receive a payment if an Ad is placed using your affiliate link. Any website that uses [TonicPow](https://tonicpow.com/?affiliate=$tonicpow) supports the [$handcash](https://handcash.io/) affiliate functionality.
```
https://tonicpow.com/?affiliate=$your-handle

https://some-website.com/?affiliate=$your-handle

https://some-website.com/?affiliate=1BrwAE2qg6qBaB2n...
```

## Code Standards
- Always use the language's best practices!

## Usage
- Setup your own embed using the [TonicPow](https://tonicpow.com/?affiliate=$tonicpow) generator script or [above installation](https://github.com/tonicpow/embed#installation).

## Maintainers
[Attila](https://github.com/attilaaf) - [Satchmo](https://github.com/rohenaz) - [MrZ](https://github.com/tonicpow)

Support the development of this project and the [TonicPow](https://tonicpow.com/?affiliate=$tonicpow) team 🙏

## Contributing
Feel free to dive in! [Open an issue](https://github.com/tonicpow/embed/issues/new) or submit PRs.

## License
![License](https://img.shields.io/github/license/tonicpow/embed.svg?style=flat)