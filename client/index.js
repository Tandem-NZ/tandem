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


  $(".seeMore").click(function(e){
    e.preventDefault()
    // console.log("guess who was clicked")
    var listingID = e.target.id
    request
    .get('/singleListing?listingID=' + listingID )
    .end(function(err, res){
      var listingUserAndCommentArray = res.body
      $('#newRides').html(singleListing({ data : listingUserAndCommentArray[0], comments:          listingUserAndCommentArray })  )
    })
  })

  $("body").on("click", "#commentSubmit", function(e){
    var comment = $('#commentReply').val()
    var listingID = $('#listing').attr('data-listingID')
    request
      .post('/listings/' + listingID + '/comment')
      .send({ comment: comment, listingID: listingID })
      .end(function(err, res){
        var data = res.body
        $('#appendedComments').html(listingComment({data: data}))
        $('#commentReply').val('')
      })
  })


$("body").on("click", "#requestRide", function(e){
	e.preventDefault()
	console.log('hitting request a ride listener')
	var listingID = $('#listing').attr('data-listingID')
	console.log('This data.listingID', listingID)
	request
		 .post('/liftConfirm')
		 .send({listingID: listingID}) 
		 .end(function(err, res) {
			 console.log(res.body)
		  	var data = res.body
		   	$('body').html(liftConfirm({
						origin: data.origin,
						destination: data.destination,
						date: data.departureDate,
						time: data.departureTime,
						listingID: data.listingID
					})
					// console.log('This data.listingID', data.listingID)

				)
			})
})


  $("body").on("click", ".rideConfirm", function(e){
    e.preventDefault()
    var listingID = e.target.class
    var description = $('#description').val()
    console.log("e.target.class: ", listingID)
    request
      .post('/liftEnjoy')
      .send({listingID: listingID, description: description })
      .end(function (err, res) {
        $('body').html(liftEnjoy({name: "lizzie"}))
      })
  })

}) // close doc ready


// 1. pure serverside rendering - nice and simple
  // take out ajax
  // res.render hbs

// 2. initial render serverside
  // POST Listing/id/comment
    // respond with all comments associetd with listing id
    // respond with specific comment
    //  sperately trigger a GET listing/id/comments
  // client side render listing with its comments

// 3. pure client-side


// its working but is it using form action (html5 forms)?
// what's happening with the ajax?

// server
// respond with the comment we just inserted


// $('#requestRide').click(function(e) {
//   console.log('Hi! Im request ride')
//   e.preventDefault()
//   request
//   .get('/liftConfirm')
//   .send({origin: origin})
//   .end(function(err, res) {
//     var data = res.body
//     $('body').html(liftConfirm({origin: res.body.origin, destination: res.body.destination,
//       date: res.body.departureDate, time: res.body.departureTime, listingID: res.body.listingID}))
//     })
// })


// $("body").on("click", "#requestRide", function(e){
//   // console.log("FIRED!")
//   e.preventDefault()
//   console.log("e", e)
//   var listingID = e.target.id
//   // console.log("listingID: ", listingID)
//   request
//   .get('/liftConfirm')
//   .send({listingID: listingID })
//   .end(function(err, res) {
//     // console.log("res.body: ", res.body)
//     var data = res.body
//     $('body').html(liftConfirm({origin: data.origin, destination: data.destination, date: data.departureDate, time: data.departureTime, listingID: data.listingID}))
//     })
// })
