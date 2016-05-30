var request = require('superagent')
var $ = require('jquery')

var ridesListing = require('../views/currentListings/_ridesListing.hbs') //why the underscore?
var singleListing = require('../views/singleListing.hbs')
var listingComment = require('../views/listingComment.hbs')
var liftConfirm = require('../views/liftConfirm.hbs')
var liftEnjoy = require('../views/liftEnjoy.hbs')

function showError() {
  
}



$(document).ready(function(){

  $("#searchButton").click(function(e) {
    e.preventDefault()
    var origin = $("#origin").val()
    var destination = $("#destination").val()
    if (origin == null || origin == "") {
      showError('Must have origin')
    }else{
      //extract function searchListingsAndAppendResults
      request
        .post('/moreCurrentListings')//maybe a get not a post
        .send({ origin: origin, destination: destination })
        .end(function(err, res) {
          var newListing = res.body
          $('#newRides').html(ridesListing({ listing: newListing }))
        })
    }
  })


  function renderListing(listing) {
    $('body').html(liftConfirm({origin: listing.origin, destination: listing.destination,
            date: res.body.departureDate, time: res.body.departureTime, listingID: res.body.listingID}))
      })

  }
  $('#requestRide').click(function(e) {
    e.preventDefault()
    request
      .get('/liftConfirm')
      .send({origin: origin})
      .end(function(err, res) {
        renderListing(res.body)     
      })

  //why class not id?
  $('.rideConfirm').click(function(e) {
    e.preventDefault()
    var listingID = e.target.id
    var description = $('#description').val()
    request
      .post('/liftEnjoy')
      .send({listingID: listingID, description: description })
      .end(function (err, res) {
        $('body').html(liftEnjoy())
      })
  })

  $("#commentSubmit").click(function(e){
    e.preventDefault()
    var comment = $('#commentReply').val()
    var listingID = $('#listingID').val()
    request
      .post('/commentOnListing')
      .send({ comment: comment, listingID: listingID })
      .end(function(err, res){
        var data = res.body
        $('#appendedComments').append(listingComment({comment: data.comment, listingID: data.listingID}))
        $('#commentReply').val('')
      })
  })


  $(".seeMore").click(function(e){
    e.preventDefault()
    var listingID = e.target.id
    request
    .post('/singleListing' )
      .send({ listingID: listingID })
      .end(function(err, res){
        var listingIDfromServer = res.body
        $('#newRides').html(singleListing({ data : listingIDfromServer }))
    })
  })
}) // close doc ready
