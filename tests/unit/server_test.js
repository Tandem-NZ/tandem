var request = require('supertest')
var test = require('tape')
var cheerio = require('cheerio')
var app = require('../../server')

test('visiting homepage takes user to correct view', function(t){
  request(app)
  .get('/')
  .end(function(err, res) {
    t.equal(res.status, 200, 'http status is 200 (ok)')
    t.end()
  })
})

test('posting on homepage redirects to currentListings + origin', function(t) {
  var data = { origin: 'Kaeo', destination: 'Wellington' }
  request(app)
  .post('/main')
  .send( data )
  .end(function(err, res) {
    t.equal(res.status, 302, 'http status is 302 (redirect)')
    t.end()
  })
})

test('if no origin or destination is provided by user, error message appears', function(t) {
  var noSearchQuery = { origin: "", destination: "" }
  request(app)
  .post('/main')
  .send(noSearchQuery)
  .end(function(err, res) {
    $ = cheerio.load(res.text)
    t.equal($('p').text(), "Ooops...please enter a start point", "error text appended to page" )
    t.end()
  })
})
