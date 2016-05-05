var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../app/models/user');

    module.exports = function(app) {
        
        app.use(require("express-session")({
            secret: "Anything!",
            resave: false,
            saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
        
        app.use(function(req, res, next){
           // attach current user to the response
           res.locals.currentUser = req.user;
          // res.locals.error = req.flash("error");
          //res.locals.success = req.flash("success");
        next();
        });

    };

