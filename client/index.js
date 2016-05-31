var request = require('superagent')
var $ = require('jquery')
var ridesListing = require('../views/currentListings/_ridesListing.hbs')
var singleListing = require('../views/singleListing.hbs')
var listingComment = require('../views/listingComment.hbs')
var liftConfirm = require('../views/liftConfirm.hbs')
var liftEnjoy = require('../views/liftEnjoy.hbs')
var main = require('../views/main.hbs')

$(document).ready(function(){

  $("#searchButton").click(function(e) {
    e.preventDefault()
    var origin = $("#origin").val()
    var destination = $("#destination").val()
    if (origin == null || origin == "") {
      var message = "Ooops...please enter a start point"
        document.getElementById("alert").innerHTML = message;
        return false;
      }else{
          request
            .post('/moreCurrentListings')
            .send({ origin: origin, destination: destination })
            .end(function(err, res) {
              var newListing = res.body
              $('#newRides').html(ridesListing({ listing: newListing }))
          })
      }
  })

  $('#requestRide').click(function(e) {
    console.log('hitting listener')
    e.preventDefault()
    request
    .get('/liftConfirm')
    .send({origin: origin})
    .end(function(err, res) {
      var data = res.body
      $('body').html(liftConfirm({origin: data.origin, destination: data.destination, date: data.departureDate, time: data.departureTime, listingID: data.listingID}))
      })
  })

  $('.rideConfirm').click(function(e) {
    e.preventDefault()
    var listingID = e.target.id
    // console.log("listingID", listingID)
    var description = $('#description').val()
    request
      .post('/liftEnjoy')
      .send({listingID: listingID, description: description })
      .end(function (err, res) {
        // console.log("hopefully there's some data in request Ride table!")
        $('body').html(liftEnjoy({name: "lizzie"}))
      })
  })

  $("#newSearch").click(function(e) {
    e.preventDefault()
    $('body').html(main)
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
