# TonicPow Ad Network Protocol (Alpha Spec)
> Simple online ad publishing protocol built on Bitcoin OP_RETURN

# Intro

Design goals:

1. Simple protocol for displaying, publishing, and approving ads.
2. Create a micro-funding ad campaign.
3. Built-in affiliate commissions via sharing the url.
4. No centralized database, all actions are on-chain.

# Use Cases

- Publish ads and reach your audience
- Create a micro-funding campaign for a fundraiser, charity, etc
- Earn money with your website by showing ads
- Earn money sharing urls if someone donates or buys an ad

# Protocol Flow Overview

Ad Units can be in 2 states at any instant:

**Filled:**

A display ad is shown if someone has purchased the Ad spot in the current block height.

**Unfilled:**

A placeholder ad (ex: "Advertise here!") is shown when there are no active purchases for the current block height.

An ad is 'Filled' if there exists an 'Approved Ad Campaign' OP_RETURN for the current block (ie:  'From Block Height' <= latest block <= 'To Block Height') and it's validated (TODO: elaborate on affiliate & TonicPow payment validation).

# Protocol Messages

#### Request Campaign

Would-be publisher creates this OP_RETURN to advertise on an ad unit.


** Display Ad**

```
OP_RETURN
  [ B PREFIX ]
  [ Content Bytes ]
  [ Content Type ]
  [ Encoding ]
  [ File name ]
  '|'
  [ MAP PREFIX ]
  'app'
  'tonicpow'
  'type'
  'campaign_request'
  'site_address'
  [ Site Bitcoin Address ]
  'ad_unit_id'
  [ Ad Unit ID ]
  'affiliate_address'
  [ Affiliate Address ]
  'num_blocks'
  [ Number of Blocks ]
  'ad_type'
  'display'
  'cta_url'
  [ Call to action URL ]
  'rate'
  'width'
  [ Ad width ] (optional)
  'height'
  [ Ad height ] (optional)
  'campaign_name'
  [ Campaign name ] (optional)
```

**Crowd Fund Ad**

```
OP_RETURN
  [ B PREFIX ]
  [ Content Bytes ]
  [ Content Type ]
  [ Encoding ]
  [ File name ]
  '|'
  [ MAP PREFIX ]
  'app'
  'tonicpow'
  'type'
  'campaign_request'
  'site_address'
  [ Site bitcoin Address ]
  'ad_unit_id'
  [ Ad Unit ID ]
  'affiliate_address'
  [ Affiliate Bitcoin Address ]
  'num_blocks'
  [ Number of Blocks ]
  'ad_type'
  'funder'
  'cta_text'
  [ Call to action Text ]
  'currency'
  [ Currency to show for Money Button ]
  'rate'
  'width'
  [ Ad width ] (optional)
  'height'
  [ Ad height ] (optional)
  'campaign_name'
  [ Campaign name ] (optional)
```

An affiliate public key is optional and is set if `?affiliate=pub-key` is on the parent url of the advertisement page.

The TonicPow pub-key is derived from the embed script and can change at anytime.

For the hackathon we will simplify and have the user manually approve and not have any OP_RETURN to signal cost of blocks (ie: just encode the 'cost per block' in the JS embed itself).  In the future we can make this either dynamic or query a "Block Cost Menu" OPRETURN to indicate the cost.

#### Approved Campaign (Out of scope)

The owner of the website signs an OP_RETURN for the approved campaign. The JS snippet queries only these in determining what ad to show.

```
OP_RETURN
  [ MAP PREFIX ]
  'approved'
  [ Txid of Request Campaign ]
  [ Ad Unit ID ]
  [ Txid of B file to Ad Creative ]
  [ Number of Blocks ]
  [ Txid of Affiliate Payment ]
  [ Txid of TonicPow Payment ]
  '|'
  [ AIP PREFIX ]
  'BITCOIN_ECDSA'
  [ Website Public Key ]
  [ Signature of all fields with the Website Private Key ]
```

Note 1: There must be an output that **pays to TonicPow.com Public Key** at least 100,000 sats (spam prevention measure). We can make this as a % of the Request Campaign Txid output in future. The TX to TonicPow must be referenced and checked.

Note 2: There must be an output that pays 5% of the purchase amount to the Affiliate Public Key if the *Txid of Affiliate Payment* is provided. It should match the public key from the previous *Request Campaign* TX.

Fields:

1. **Txid of Request Campaign:** Txid of the original request.
2. **Ad Unit ID:** Arbitrary unique ID to distinguish multiple Ad Units on a site in future
3. **Txid of B file to Ad Unit:** b:// file reference to JSON of the form:

```javascript
{
  type: 'display',    // 'display' or 'funding'
  image: 'b://...',   // B:// image link
  text: '...',        // Text message. Applicable to 'funding' type
  amount: 1.00,       // Suggested funding amount. Applicable to 'funding' type
  url: '...'          // Call-to-action URL. Applicable to 'display' type
}
```

4. **Number of Blocks:** Show for this many blocks
5. **Txid of Affiliate Payment:** this is a TX that goes to the Affiliate Pubkey for 5% of the campaign amount
6. **Txid of TonicPow Payment:** this is a TX that goes to the TonicPow Pubkey at least 100,000 sats

#### Configure Embed

//TODO: this needs to be flushed out
// allows remote configuration of the embed (rate, default ad, other settings)

#### Disable Campaign

//TODO: this needs to be flushed out
// returned amount of non-shown blocks
// signed with AIP
