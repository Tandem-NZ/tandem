var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var bcrypt = require('bcrypt-node')
var Knex = require('knex')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var cookie = require('cookie-parser')
var port = process.env.PORT || 3000
var dotenv = require('dotenv') //could check env, if production don't load dotenv.

var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[env])

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })) //get the secret from environment to make your sessions safe
dotenv.load() //see 11

app.use(passport.initialize())
app.use(passport.session())

//this seems to be unused, seems like client code.Remove from here.  
function validateForm() {
    var x = document.forms["searchForm"]["origin"].value;
    if (x == null || x == "") {
      var message = "Ooops...please enter a start point"
        document.getElementById("alert").innerHTML = message;
        return false
    }
}

//maybe move this to seperate db folder / file and require this in as needed.
//searchForRideByLocations
function search(origin, destination){
  var searchObject = {origin: origin}
  if(destination){
    searchObject.destination = destination
  }
  return knex('listings').where(searchObject).innerJoin('users', 'listings.userID', '=', 'users.userID')
}

// function profile(profile){
//   return knex('users').where('userID', '=', 'users.userID')
//
// }

//maybe move this to seperate db folder / file and require this in as needed.
function singleListing(listingID){
  return knex('listings').where({listingID: listingID}).innerJoin('users', 'listings.userID', '=', 'users.userID')
}

app.get('/', function(req, res){
  res.render('main', { layout: '_layout' }) //*can you delete the layout object?
})

app.get('/currentListings', function(req, res){
  search(req.query.origin, req.query.destination)
  .then(function(data){
    res.render('./currentListings/currentListings', {layout: '_layout' , listing: data})
  })
})

app.get('/signup', function (req, res) {
  res.render('register', {layout: '_layout'}) //*change register filename to signup?
})

app.get('/signin', function (req, res) {
  res.render('login', {layout: '_layout'})
})


//============Create a Listing================
// GET /listings/new
app.get('/createListing', function (req, res) {
  res.render('createListing')
})

//POST /listings
app.post('/createListing', function (req, res) {
  res.render('createListing') //
  //any calls to res.send or res.render won't work from here down.
  knex('listings').insert(req.body)
  .then(function (data) {
    res.render('listingConfirm')
    console.log("data: ", data)
      .catch(function(error) {
        console.log("catch error: ", error)
      })
  })
})

//GET listings/:id
//Refactor knex call into a seperate function that you require in. 
// *change hard coded userID or add documentation.
app.get('/singleListing', function(req, res){
  var userID = 2
  knex('users').where({'users.userID': userID}).select('*').innerJoin('listings', 'users.userID', 'listings.userID').innerJoin('comments', 'listings.listingID', 'comments.commentID')
  .then(function(data){
    res.render('singleListing',{ data: data })
  })
})




//=============== POST Routes ================
// Post request usually used a make a new record in the db, this is just searching.
// Instead just make the client got to /currentListings?origin......


app.get('/singleListing', function(req, res){
  knex('users').where({'users.userID': 2}).select('*').innerJoin('listings', 'users.userID', 'listings.userID')
  .then(function(data){
    var listing = { 
      userID: data[0].name, 
      origin: data[0].origin, 
      destination: data[0].destination, 
      date: data[0].dateTime, 
      listingID: data[0].listingID, 
      description: data[0].description, 
      layout: '_layout' //default layout gets rid of this. 
    }
    res.render('singleListing', listing )
  })
})

// Duplicate?
// Indendation?
app.post('/createListing', function (req, res) {
  res.render('createListing')
  knex('listings').insert(req.body)
  .then(function (data) {
  })
  .catch(function (error) {
  })
})

app.post('/singleListing', function(req, res) {
  singleListing(req.body.listingID)
  .then(function(data) {
    res.json(data)
  })
})

app.post('/moreCurrentListings', function(req, res) {
  search(req.body.origin, req.body.destination)
  .then(function(data) {
    res.json(data)
  })
})

// app.post('/profile', function(req, res)
//   profile
// )

//===================Ride Confirmation====================
//Indendation
app.get('/liftConfirm', function (req, res){
  knex.select('origin', 'destination', 'departureDate', 'departureTime', 'listingID').from('listings')
  .then (function(data) {
    res.json(data[8])
  })
})

app.post('/liftEnjoy', function(req, res) {
  var description = req.body.description
  var listingID = req.body.listingID
  knex('ride_requests').insert({listingID: listingID, description: description})
  // .then?
  // 
  knex('listings').where({listingID: listingID}).update({ride_requested: true})
    .then (function(data){
      res.json(data)//?
      res.ok()
    })
})


//===================Authorisation Code===================
//indentation
app.post('/signup', function (req, res) {
  var hash = bcrypt.hashSync( req.body.password)
  knex('users').insert({ email: req.body.email, hashedPassword: hash })
    .then(function(data){
        res.redirect('currentListings')
    })
    .catch(function(error){
       console.log("error:", error)
        res.redirect('/')// no error message for the client
    })
})

app.post ('/login', function(req,res) {
  knex('users').where({email: req.body.email})
    .then (function(data){
      var hashedLogin = data[0].hashedPassword
      if  (bcrypt.compareSync(req.body.password, hashedLogin)) {
        res.redirect('/currentListings/')
      }
    })
    .catch (function (error) {
      console.log("error:", error)
      //no response sent, browser will just hang waiting for one. 
      //what status code could you send? 403?
    })
})

// //============== OAuth =====================

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('req.user', req.user)
    res.render('currentListings')
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

app.listen(port, function () {
  console.log('catching a lift on ' + port)
})
