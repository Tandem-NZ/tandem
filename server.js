var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var bcrypt = require('bcrypt-node')
var Knex = require('knex')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var cookie =require('cookie-parser')
var port = process.env.PORT || 3000
var dotenv = require('dotenv')

var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[env])

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'abandoned  birds', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
dotenv.load()

function search(origin, destination){
  var searchObject = {origin: origin}
  if(destination){
    searchObject.destination = destination
  }
  console.log('this is search object', searchObject)
  return knex('listings').where(searchObject).innerJoin('users', 'listings.userID', '=', 'users.userID')
}

function displayListingUserCommentData (listingID){
  return knex('listings').where({'listings.listingID': listingID}).
    leftOuterJoin('comments', 'comments.listingID', '=', 'listings.listingID').
    rightOuterJoin('users', 'users.userID', '=', 'listings.userID').
    select('*')
}

app.get('/', function(req, res){
  res.render('main', { layout: '_layout' })
})

app.get('/currentListings', function(req, res){
  console.log('this is req:')
  search(req.query.origin, req.query.destination)
  .then(function(data){
    res.render('./currentListings/currentListings', {layout: '_layout' , listing: data})
  })
})



//============Create a Listing================

app.get('/createListing', function (req, res) {
  res.render('createListing')
})

app.post('/createListing', function (req, res) {
  res.render('createListing')
  knex('listings').insert(req.body)
  .then(function (data) {
    res.render('listingConfirm')
    console.log("data: ", data)
    .catch(function(error) {
      console.log("catch error: ", error)
    })
  })
})

//=============== POST Routes ================

app.post('/main', function(req, res) {
  var originFromMain = req.body.origin
  var destinationFromMain = req.body.destination
  search(originFromMain, destinationFromMain)
  .then(function(data) {
    res.redirect('/currentListings?origin=' + originFromMain + '&destination='  + destinationFromMain)
  })
})

app.post('/createListing', function (req, res) {
  res.render('createListing')
  knex('listings').insert(req.body)
  .then(function (data) {
  })
  .catch(function (error) {
  })
})

app.get('/singleListing', function(req, res) {
  var listingID = req.query.listingID
  console.log('listingID: ', listingID)
  displayListingUserCommentData(listingID)
  .then(function(data) {
    // console.log('data from db: ', data)
    data[0].listingID = listingID
    res.json(data)
  })
})

app.post('/listings/:id/comment', function(req, res){
  var comment = req.body.comment
  var listingID = req.params.id
  knex('comments')
    .insert({comment: comment, listingID: listingID })
    .then(function(){
      return knex.select('*').from('comments').where('listingID', listingID)
    })
    .then(function(data){
      res.send(data)
    })
})

app.post('/moreCurrentListings', function(req, res) {
  search(req.body.origin, req.body.destination)
  .then(function(data) {
    res.json(data)
  })
})

//===================Ride Confirmation====================

app.get('/liftConfirm', function (req, res){
  // console.log("res.body: ", res.body, "req.body:", req.body)
  knex.select('origin', 'destination', 'departureDate', 'departureTime', 'listingID').from('listings')
    .then (function(data) {
      // console.log("data: ", data)
      var listingID = data[2]
      // console.log("server side listingID:", listingID)
      // console.log("hi I'm data: ", listingID)
      res.json(listingID)
    })
})

//=====sessions need to be implemented for this to be fully functional======

app.post('/liftEnjoy', function(req, res) {
  // console.log("Req: ", req.body)
  var description = req.body.description
  var listingID = req.body.listingID
  knex('ride_requests').insert({listingID: listingID, description: description})
  .then (function()  {
    knex('listings').where({listingID: listingID}).update({ride_requested: true})
  })
    .then (function(data){
      res.json(data)
    })
})

//===================Authorisation Code===================

app.get('/signup', function (req, res) {
  res.render('register', {layout: '_layout'})
})

app.get('/signin', function (req, res) {
  res.render('login', {layout: '_layout'})
})

app.post('/signup', function (req, res) {
  var hash = bcrypt.hashSync( req.body.password)
  console.log('This is signup req.body', req.body)
  knex('users').insert({ email: req.body.email, hashedPassword: hash })
  .then(function(data){
    res.redirect('/')
  })
  .catch(function(error){
    console.log("error:", error)
    res.send('Error, please refresh the page and try again')
  })
})

app.post ('/login', function(req,res) {
  knex('users').where({email: req.body.email})
  .then (function(data){
    var hashedLogin = data[0].hashedPassword
    if  (bcrypt.compareSync(req.body.password, hashedLogin)) {
      res.redirect('/')
    }
  })
  .catch (function (error) {
    console.log("error:", error)
    res.sendStatus(403)
  })
})

// //============== OAuth =====================

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
      function (req, res) {
        res.redirect('/')
      })
passport.use(new FacebookStrategy ({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function (accessToken, refreshToken, profile, callback) {
  knex('users').select('*').where({
    facebookID: profile.id
  }).then(function (resp) {
    if (resp.length === 0) {
      var user = {
        facebookID: profile.id,
        name: profile.displayName
      }

// //============== set user in session ===================
//Set user in session
knex('users').insert(user).then(function (resp) {
        callback(null, user)
      })
    } else {
      callback(null, resp[0])
    }
  })
}
))

passport.serializeUser(function(user, callback) {
  callback(null, user)
})
passport.deserializeUser(function(obj, callback) {
  callback(null, obj)
})

//============== Auth Ends ============================

app.listen(3000, function () {
  console.log('catching a lift on 3000!')
})
