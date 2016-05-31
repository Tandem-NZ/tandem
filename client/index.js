var request = require('superagent')
var $ = require('jquery')
var toTitleCase = require('to-title-case')
var moment = require('moment')
moment().format();

var ridesListing = require('../views/currentListings/_ridesListing.hbs')
var singleListing = require('../views/singleListing.hbs')
var listingComment = require('../views/listingComment.hbs')
var liftConfirm = require('../views/liftConfirm.hbs')
var liftEnjoy = require('../views/liftEnjoy.hbs')
var profile = require('../views/profile.hbs')

$(document).ready(function(){

  $("#searchButton").click(function(e) {
    e.preventDefault()
    var rawOrigin = $("#origin").val()
    var rawDestination = $("#destination").val()
    var origin = toTitleCase(rawOrigin)
    var destination = toTitleCase(rawDestination)
    if (origin == null || origin == "") {
      var message = "Ooops...please enter a start point"
        document.getElementById("alert").innerHTML = message;
        return false;
      } else {
          request
            .post('/moreCurrentListings')
            .send({ origin: origin, destination: destination })
            .end(function(err, res) {
              var newListing = res.body
              $('#newRides').html(ridesListing({ listing: newListing }))
          })
      }
  })

  $(".seeMore").click(function(e){
    e.preventDefault()
    console.log("guess who was clicked")
    var listingID = e.target.id
    request
    .get('/singleListing?listingID=' + listingID )
    .end(function(err, res){
      var listingUserAndCommentArray = res.body
      // console.log('listingUserAndCommentArray: ', listingUserAndCommentArray)
      $('#newRides').html(singleListing({ data : listingUserAndCommentArray[0], comments: listingUserAndCommentArray })  )
    })
  })

  $("body").on("click", "#commentSubmit", function(e){
    var comment = $('#commentReply').val()
    var listingID = $(this).attr('data-listingID')
    request
      .post('/listings/' + listingID + '/comment')
      .send({ comment: comment, listingID: listingID })
      .end(function(err, res){
        var data = res.body
        // console.log('data (in commentSubmit): ', data)
        $('#appendedComments').html(listingComment({data: data}))
        $('#commentReply').val('')
      })
  })

  $('#requestRide').click(function(e) {
    console.log('Hi! Im request ride')
    e.preventDefault()
    request
    .get('/liftConfirm')
    .send({origin: origin})
    .end(function(err, res) {
      var data = res.body
      $('body').html(liftConfirm({origin: res.body.origin, destination: res.body.destination,
        date: res.body.departureDate, time: res.body.departureTime, listingID: res.body.listingID}))
      })
  })

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

}) // close doc ready
