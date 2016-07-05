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
var createListing = require('../views/createListing.hbs')

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
    var listingID = e.target.id
    request
    .get('/singleListing?listingID=' + listingID )
    .end(function(err, res){
      var listingUserAndCommentArray = res.body
      var listingView = singleListing({
        data: listingUserAndCommentArray[0][0],
        comments: listingUserAndCommentArray[1]
      })
      $('#newRides').html( listingView )
    })
  })

  $("body").on("click", "#commentSubmit", function(e){
    var comment = $('#commentReply').val()
    console.log('this is "e": ', e)
    var listingID = $('#listing').attr('data-listingID')
    request
      .post('/listings/' + listingID + '/comment')
      .send({ comment: comment, listingID: listingID })
      .end(function(err, res){
        var data = res.body
        console.log('data: ', data)
        $('#appendedComments').html(listingComment({data: data}))
        $('#commentReply').val('')
      })
  })

$("body").on("click", "#requestRide", function(e){
	e.preventDefault()
	var listingID = $('#listing').attr('data-listingID')
	request
		 .post('/liftConfirm')
		 .send({listingID: listingID})
		 .end(function(err, res) {
		  	var data = res.body[0]
		   	$('body').html(liftConfirm({ data: data })
				)
			})
})

  $("body").on("click", "#liftEnjoyButton", function(e){
    e.preventDefault()
		var listingID = $('#listing').attr('data-listingID')
    var description = $('#description').val()
    request
      .post('/liftEnjoy')
      .send({listingID: listingID, description: description })
      .end(function (err, res) {
        $('body').html(liftEnjoy())
      })
  })

}) // close doc ready
