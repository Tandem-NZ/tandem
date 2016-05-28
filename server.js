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
var knex = Knex(knexConfig[env]);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))

dotenv.load()

app.use(passport.initialize())
app.use(passport.session())


function search(origin){
  return knex('listings').where({origin: origin}).innerJoin('users', 'listings.userID', '=', 'users.userID')
}

app.get('/', function(req, res){
  res.render('main', { layout: '_layout' })
})

app.get('/currentListings/:origin', function(req, res){
  search(req.params.origin)
  .then(function(data){
    res.render('./currentListings/currentListings', {listing: data})
  })
})

app.get('/signup', function (req, res) {
  res.render('login')
})


//=============== POST Routes ================


app.post('/currentListings', function(req, res) {
  var fromMain = req.body.origin
  console.log("fromMain:", fromMain)
  search(req.body.origin)
  .then(function(data) {
    res.redirect('/currentListings/'+fromMain)
  })
})


app.post('/moreCurrentListings', function(req, res) {
  search(req.body.origin)
  .then(function(data) {
    res.json(data)
  })
})


//===================Authorisation Code===================

app.post('/signup', function (req, res) {
var hash = bcrypt.hashSync( req.body.password)
 knex('users').insert({ email: req.body.email, hashedPassword: hash })
    .then(function(data){
        //create sessions
        // req.session.userId = data[0]
        res.redirect('currentListings')
    })
    .catch(function(error){
       console.log("error:", error)
        // req.session.userId = 0
        res.redirect('/')
    })
})

app.post ('/login', function(req,res) {
  knex('users').where({email: req.body.email})
    .then (function(data){
      var hashedLogin = data[0].hashedPassword
      if  (bcrypt.compareSync(req.body.password, hashedLogin)) {
        res.redirect('/currentListings')
      }
    })
    .catch (function (error) {
      console.log("error:", error)
    })
})

//============== OAuth =====================

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('req.user', req.user)
    // req.session.user = req.user
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

//============== set user in session

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


/////Auth Ends ///////


app.listen(3000, function () {
  console.log('catching a lift on 3000!');
});
