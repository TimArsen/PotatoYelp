// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var morgan         = require("morgan");

// configuration ===========================================

// config files
var db = require('./config/db');

// connect to our mongoDB database
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log all requests to the console
 app.use(morgan('dev'));

// User auth ===============================================
require('./config/auth')(app); // configure passport

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(process.env.PORT, function() {
	console.log("The server is running!");
});               

// shoutout to the user
console.log('Server is Running!');

// expose app
exports = module.exports = app;
