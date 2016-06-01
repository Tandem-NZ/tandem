module.exports = {
  // 'Welcome page' : function (browser) {
  //   browser
  //     .url('http://localhost:3000/')
  //     .waitForElementVisible('body', 1000)
  //     .pause(1000)
  //     .assert.containsText('h1', 'Welcome to Tandem')
  //     .end();
  // },
  //
  // 'Front page search' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //     .waitForElementVisible('body', 1000)
  //     .setValue('#origin', 'Kaeo')
  //     .pause(5000)
  //     .click('#findButton')
  //     .pause(1000)
  //     .assert.urlEquals('http://localhost:3000/currentListings?origin=Kaeo&destination=')
  //     .end();
  // },
  //
  // 'Search page, only destination searched' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //     .waitForElementVisible('body', 1000)
  //     .setValue('#destination', 'Hamilton')
  //     .pause(1000)
  //     .click('#findButton')
  //     .pause(1000)
  //     .assert.containsText('p', 'Ooops...please enter a start point')
  // },
  //
  // 'No search query error' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //     .waitForElementVisible('body', 1000)
  //     .setValue('#origin', '')
  //     .pause(1000)
  //     .click('#findButton')
  //     .pause(1000)
  //     .assert.containsText('p', 'Ooops...please enter a start point')
  //     .end();
  // },
  //
  // 'Origin and destination search > to singleListing page' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#origin', 'Cromwell')
  //   .setValue('#destination', 'Nightcaps')
  //   .pause(1000)
  //   .click('#findButton')
  //   .pause(1000)
  //   .assert.urlEquals('http://localhost:3000/currentListings?origin=Cromwell&destination=Nightcaps')
  //   .end();
  // },
  //
  // 'Origin and destination search > to singleListing page with correct results' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#origin', 'Taumarunui')
  //   .setValue('#destination', 'Te Kuiti')
  //   .pause(1000)
  //   .click('#findButton')
  //   .pause(1000)
  //   .assert.containsText('h3', 'Taumarunui')
  //   .assert.containsText('h3', ' Te Kuiti')
  //   .end();
  // },
  //
  // 'Search bar on currentListings' : function(browser) {
  //   browser.url('http://localhost:3000/currentListings?origin=Taumarunui&destination=Whanganui')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#origin', 'Kaeo')
  //   .setValue('#destination', 'Hamilton')
  //   .click('#searchButton')
  //   .pause(1000)
  //   .assert.containsText('h3', 'Kaeo ')
  //   .assert.containsText('h3', ' Hamilton')
  //   .end();
  // },
  //
  // 'Create a listing button' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //   .waitForElementVisible('body', 1000)
  //   .click('a[href="/createListing"]')
  //   .pause(1000)
  //   .assert.urlEquals('http://localhost:3000/createListing')
  //   .end();
  // },
  //
  // 'How it works button' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //   .waitForElementVisible('body', 1000)
  //   .click('a[href="/howItWorks"]')
  //   .pause(1000)
  //   .assert.urlEquals('http://localhost:3000/howItWorks')
  //   .end();
  // },
  //
  // 'Update your profile button' : function(browser) {
  //   browser.url('http://localhost:3000/')
  //   .waitForElementVisible('body', 1000)
  //   .click('a[href="/profile"]')
  //   .pause(1000)
  //   .assert.urlEquals('http://localhost:3000/profile')
  //   .end();
  // },
  //
  // // 'See more' : function(browser) { //this test is not passing in firefox for some reason, but it works in chrome!
  // //   browser.url('http://localhost:3000/currentListings?origin=Cromwell&destination=Nightcaps')
  // //   .waitForElementVisible('a[class="seeMore"]', 10000)
  // //   .pause(10000)
  // //   .click('a[class="seeMore"]')
  // //   .pause(10000)
  // //   .assert.visible('button')
  // // },
  // //
  // 'Update profile submit button' : function(browser) {
  //   browser.url('http://localhost:3000/profile')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#profile-licence', 5)
  //   .setValue('#profile-age', 26)
  //   .setValue('#gender', 'F')
  //   .click('#updateProfile')
  //   .pause(1000)
  //   .assert.containsText('h1', 'Your profile has been updated...')
  //   .end();
  // },
  //
  // 'Profile confirm, return to homepage button' : function(browser) {
  //   browser.url('http://localhost:3000/profile')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#profile-licence', 5)
  //   .setValue('#profile-age', 26)
  //   .setValue('#gender', 'F')
  //   .click('#updateProfile')
  //   .pause(1000)
  //   .assert.containsText('h1', 'Your profile has been updated...')
  //   .click('a[href="/"]')
  //   .assert.urlEquals('http://localhost:3000/')
  //   .end();
  // },
  //
  // 'Create a listing > listing confirm page' : function(browser) {
  //   browser.url('http://localhost:3000/createListing')
  //   .waitForElementVisible('body', 1000)
  //   .setValue('#createListingOrigin', 'Gisborne')
  //   .setValue('#createListingDestination', 'Auckland')
  //   .setValue('#createListingDepartureDate', '01/06/2016')
  //   .setValue('#createListingDepartureTime', 09:00am)
  //   .click('#create-submit')
  //   .pause(1000)
  //   .assert.containsText('h1', 'Listing Confirmed')
  //   // .assert.containsText('li', 'From :Gisborne to Auckland')
  //   .end();
  // },

  'Request a ride' : function(browser) {
    browser.url('http://localhost:3000/currentListings?origin=Taumarunui&destination=Whanganui')
    .waitForElementVisible('body', 1000)
    .click('#requestRide')
    .pause(1000)
    .assert.containsText('li', 'Origin: Taumarunui')
    .click('#liftEnjoyButton')
    .pause(1000)
    .assert.containsText('h3', 'Go you good thang! Your trip is confirmed and your driver has been notified of your request. Thanks for using Tandem, have a great trip!')
    .pause(1000)
    .click('a[href="/"]')
    .assert.urlEquals('http://localhost:3000/')
  }

};
