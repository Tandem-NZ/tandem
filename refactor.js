//Refactor index.js so that:

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
      $('#appendedComments').html(listingComment({data: data}))
      $('#commentReply').val('')
    })
})

//the html isn't replaced in the #appendedComments div with the
//listing comment template, but instead the data is inserted //into the {{}} in the #appendedComments div.
