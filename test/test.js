let assert = chai.assert;
let expect = chai.expect;

describe('TonicPow.js loaded', function() {
  it('window.TonicPow should be set', function() {
    assert(typeof window.TonicPow === 'object', 'TonicPow is not object')
  })

  it('window.TonicPow.Handcash should be set', function() {
    assert(typeof window.TonicPow.Handcash === 'object', 'Handcash is not object')
  })

  it('window.TonicPow.Relay should be set', function() {
    assert(typeof window.TonicPow.Relay === 'object', 'Relay is not object')
  })

  it('window.TonicPow.Paymail should be set', function() {
    assert(typeof window.TonicPow.Paymail === 'object', 'Paymail is not object')
  })

  it('window.TonicPow.Storage should be set', function() {
    assert(typeof window.TonicPow.Storage === 'object', 'Storage is not object')
  })
})

describe('Test Handcash', function() {
  it('resolve Handcash handle $mr-z', function() {
    return window.TonicPow.Handcash.lookup('$mr-z') // <= return added
      .then(response => {
        expect(response).to.be.a('string')
        expect(response).to.not.be.empty;
        expect(response).to.have.lengthOf.above(24);
      })
  })
})

describe('Test RelayX', function() {
  it('resolve RelayX handle 1mrz', function() {
    return window.TonicPow.Relay.lookup('1mrz') // <= return added
      .then(response => {
        expect(response).to.be.a('string')
        expect(response).to.not.be.empty;
        expect(response).to.have.lengthOf.above(24);
      })
  })
})

describe('Test Paymail', function() {
  it('resolve Paymail handle mrz@moneybutton.com', function() {
    return window.TonicPow.Paymail.lookup('mrz@moneybutton.com') // <= return added
      .then(response => {
        expect(response).to.be.a('string')
        expect(response).to.not.be.empty;
        expect(response).to.have.lengthOf.above(24);
      })
  })
})
