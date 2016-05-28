var request = require('superagent')
var $ = require('jquery')
var currentListings = require('../views/currentListings/_ridesListing.hbs')


$("#searchButton").click(function(e) {
  e.preventDefault()
  var origin = $("#origin").val()
  var destination = $("#destination").val()
  request
    .post('/moreCurrentListings')
    .send({ origin: origin, destination: destination })
    .end(function(err, res) {
      var newListing = res.body
      $('#newRides').html(currentListings({ listing: newListing }))
    })
})


// $("#findButton").click(function(e) {
//   e.preventDefault()
//   var origin = $("#origin").val()
//   var destination = $("#destination").val()
//   console.log('origin:', origin)
//   request
//     .post('/currentListings')
//     .send({ origin: origin, destination: destination})
//     .end(function(err, res) {
//       var newListing = res.body
//       $('#newRides').html(currentListings({ listing: newListing }))
//     })
//
// })
