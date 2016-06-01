module.exports = {
  'Welcome page' : function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.containsText('h1', 'Welcome to Tandem')
      .end();
  },

  'Front page search' : function(browser) {
    browser.url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .setValue('#origin', 'Kaeo')
      .pause(5000)
      .click('#findButton')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/currentListings?origin=Kaeo&destination=')
      .end();
  },

  'Search page, only destination searched' : function(browser) {
    browser.url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .setValue('#destination', 'Hamilton')
      .pause(1000)
      .click('#findButton')
      .pause(1000)
      .assert.containsText('p', 'Ooops...please enter a start point')
  },

  'No search query error' : function(browser) {
    browser.url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .setValue('#origin', '')
      .pause(1000)
      .click('#findButton')
      .pause(1000)
      .assert.containsText('p', 'Ooops...please enter a start point')
      .end();
  },

  'Origin and destination search > to singleListing page' : function(browser) {
    browser.url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .setValue('#origin', 'Cromwell')
    .setValue('#destination', 'Nightcaps')
    .pause(1000)
    .click('#findButton')
    .pause(1000)
    .assert.urlEquals('http://localhost:3000/currentListings?origin=Cromwell&destination=Nightcaps')
    .end();
  },

  'Origin and destination search > to singleListing page with correct results' : function(browser) {
    browser.url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .setValue('#origin', 'Taumarunui')
    .setValue('#destination', 'Te Kuiti')
    .pause(1000)
    .click('#findButton')
    .pause(1000)
    .assert.containsText('h4', 'Taumarunui - Te Kuiti')
    .end();
  },

  'Search bar on currentListings' : function(browser) {
    browser.url('http://localhost:3000/currentListings?origin=Taumarunui&destination=Whanganui')
    .waitForElementVisible('body', 1000)
    .setValue('#origin', 'Kaeo')
    .setValue('#destination', 'Hamilton')
    .click('#searchButton')
    .pause(1000)
    .assert.containsText('h4', 'Kaeo - Hamilton')
    .end();
  },

  'Create a listing button' : function(browser) {
    browser.url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .click('a[href="/createListing"]')
    .pause(1000)
    .assert.urlEquals('http://localhost:3000/createListing')
    .end();
  },


};
