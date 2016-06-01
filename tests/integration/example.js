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

  'No search query error' : function(browser) {
    browser.url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .setValue('#origin', '')
      .pause(1000)
      .click('#findButton')
      .pause(1000)
      .assert.containsText('p', 'Ooops...please enter a start point')
      .end();
  }




};
