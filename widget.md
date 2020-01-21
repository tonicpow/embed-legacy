## Installation
1. Add the script to your site.
```html
<script src="https://tonicpow.com/tonic.js"></script>
```

2. Replace `data-address` with your BSV address and place the tag wherever it will be displayed.
```html
<div class="tonic" data-address="YOUR_ADDRESS"></div>
```

_(Optional)_ Use your [RelayX 1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com) in place of your wallet address
```html
<div class="tonic" data-relayx="1your-handle"></div>
```

_(Optional)_ Use your [Paymail address](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/) in place of your wallet address
```html
<div class="tonic" data-paymail="paymail@example.com"></div>
```

_(Optional)_ Use your [Handcash 2.0 Handle](https://medium.com/@handcash/introducing-handcash-2-0-future-proof-4daa46131c48) in place of your wallet address
```html
<div class="tonic" data-handcash="$tonicpow"></div>
```  

## Documentation
Checkout our nifty [Tonic generator](https://tonicpow.com/).

This Tonic embed works in relation to the [Tonic protocol](/tonic_embed_procotol.md).

Required attributes are one of the following: `data-address` or `data-handcash` or `data-relayx`

|Attribute |Example |Supported |Description |
|:---|:---|:---|:---|
|data-address|1BrwAE...|**Yes**|Your bitcoin sv wallet address.|
|data-relayx|1tonicpow|**Yes**|Your [RelayX 1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com). Used in place of data-address. |
|data-paymail|paymail@example.com|**Yes**|Your [paymail address](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/). Used in place of data-address. |
|data-handcash|$tonicpow|**Yes**|Your [handcash handle](https://medium.com/@handcash/introducing-handcash-2-0-future-proof-4daa46131c48). Used in place of data-address. |
|data-unit-id|embed-1|**Yes**|To show multiple units on one page, set each to a unique identifier of your choice.|
|data-rate|546|**Yes**|Set the rate of sats per block. The default is 546.|
|data-currency|bsv|_Not yet_|Set the currency rate (bsv or usd)|
|data-width|300|**Yes**|Set a custom width. The default is 300px. Minimum is 160x|
|data-height|250|**Yes**|Set a custom height. The default and minimum is 250px; There is an additional 22px footer.|
|data-image|https://...|**Yes**|Default image url if no ad is present||
|data-url|https://...|**Yes**|Default click url if no ad is present||
|data-link-color|#FFF|**Yes**|Change the link color via CSS value (#007bff)|
|data-funding|true|_Not yet_|Toggle funding campaigns, default is true (on)|

#### Handcash Support _(Deprecated)_
**This feature has been deprecated by [handcash](https://www.handcash.io/migration/en/index.html).**
We support new handcash handles that have related paymail addresses.

#### RelayX 1handle Support
This Tonic embed script converts [RelayX 1handles](https://relayx.io/?affiliate=tonicpow@moneybutton.com) to wallet addresses on-the-fly when loading.
You can supply a [1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com) handle via `data-relayx`.

#### Paymail Address Support
This Tonic embed script converts [paymail addresses](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/) to wallet addresses on-the-fly when loading via the [polynym](https://github.com/uptimesv/polynym) library and api.

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
Using the [bitcoin sticker protocol](https://sticker.planaria.network/?affiliate=tonicpow@moneybutton.com), it ensures that any embed that is missing a `data-address` will use sticker address.

In the future this will be used for tipping, likes, sharing, etc.

#### Affiliates
If you share any url and append `?affiliate=1your-handle` or `?affiliate=paymail@example.com` the embed will process your handle/address and store it associated to all ads on the page.

If you don't have a [1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com) you can provide your [paymail address](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/) `?affiliate=paymail@example.com` or a [bsv wallet address](https://en.bitcoin.it/wiki/Address)  `?affiliate=1BrwAE2qg6qBaB2n...`. 

The affiliate/publisher relationship is stored in user's local session for future visits. 

## Examples

#### Demo Tonics
View the [interactive live demo ads](https://tonicpow.com/) and [more examples here](/examples/example.html)

#### Affiliate
Replace `1your-handle` with your [1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com) or use a [paymail address](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/) or [bsv wallet address](https://en.bitcoin.it/wiki/Address) and share!
Receive a payment if an Ad is purchased using your affiliate link. Any website that uses [TonicPow](https://tonicpow.com/) supports the [1handle](https://relayx.io/?affiliate=tonicpow@moneybutton.com) and [paymail address](https://blog.moneybutton.com/2019/05/31/introducing-paymail-an-extensible-identity-protocol-for-bitcoin-bsv/) affiliate functionality.
```
https://some-website.com/?affiliate=1your-handle  

https://some-website.com/?affiliate=paymail@example.com

https://some-website.com/?affiliate=1BrwAE2qg6qBaB2n...
```
