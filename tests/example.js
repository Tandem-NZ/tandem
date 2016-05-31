module.exports = {
  'Welcome page' : function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.containsText('h1', 'Welcome to Tandem')
      .end();
  }
};
