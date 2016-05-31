var request = require('superagent')
var $ = require('jquery')
var ridesListing = require('../views/currentListings/_ridesListing.hbs')
var singleListing = require('../views/singleListing.hbs')
var listingComment = require('../views/listingComment.hbs')
var liftConfirm = require('../views/liftConfirm.hbs')
var liftEnjoy = require('../views/liftEnjoy.hbs')

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

  $(".seeMore").click(function(e){
    e.preventDefault()
    // console.log('e.target: ', e.target)
    var listingID = e.target.id
    console.log('listingID: ', listingID)
    request
    .get('/singleListing?listingID=' + listingID )
    .end(function(err, res){
      var listingUserAndCommentArray = res.body
      console.log('listingUserAndCommentArray', listingUserAndCommentArray)
      $('#newRides').html(singleListing({ data : listingUserAndCommentArray[0], comments: listingUserAndCommentArray })  )
    })
  })


  $("body").on("click", "#commentSubmit", function(e){
    console.log('e.target: ', e.target.id)
    console.log("comments client route being hit!")
    var comment = $('#commentReply').val()
    var listingID = $(this).attr('data-listingID')
    request
      .post('/listings/' + listingID + '/comment')
      .send({ comment: comment, listingID: listingID })
      .end(function(err, res){
        var data = res.body
        // console.log('data: ', data)
        $('#appendedComments').html(listingComment({data: data}))
        $('#commentReply').val('')
      })
  })

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
