var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//Register New User
router.post("/register", 
    function(req, res){
        var newUser = new User({username: req.body.username}); // Create new user from form data
        User.register(newUser, req.body.password, // Register new User in database
            function(err, user){
                // Handle Errors
                if(err){res.send(err)}
                // Log User in
                passport.authenticate("local")(req, res, 
                    function(){
                    res.json(user); 
                });
        }); 
});
    
// Login
router.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.send(req.user); 
    }
);
        
// Logout
router.get("/logout", function(req, res){
    req.logout();
    res.send("logged out");
});

module.exports = router;