class Tonic {
  constructor (params) {
    for (let k in params) {
      this[k] = params[k]
    }
  }

  get schema () {
    return {
      B: {},
      MAP: {},
      in: []
    }
  }

  get bImgDataSrc () {
    if (this.B && this.B['encoding'] === 'binary') {
      return 'data:' + this.B['content-type'] + ';base64, ' + this.B.content
    }
  }

  get adType () {
    if (this.MAP && this.MAP['ad_type'] && this.MAP['ad_type'] === 'funding') {
      return 'funding'
    }
    return 'display'
  }

  get ctaUrl () {
    if (this.MAP && this.MAP['cta_url']) {
      return this.MAP['cta_url']
    }
    return undefined
  }

  get ctaText () {
    if (this.MAP && this.MAP['cta_text']) {
      return this.MAP['cta_text']
    }
    return 'Donate'
  }

  get affiliatePubKey () {
    if (this.MAP && this.MAP['affiliate_pub_key'] && this.MAP['affiliate_pub_key'] !== '00') {
      return this.MAP['affiliate_pub_key']
    }
    return undefined
  }

  get currency () {
    if (this.MAP && this.MAP['currency']) {
      return this.MAP['currency']
    }
    return 'usd'
  }

  get firstVinAddress () {
    if (this.in && this.in[0] && this.in[0].e.a) {
      return this.in[0].e.a
    }
    return undefined
  }
}

export default Tonic
