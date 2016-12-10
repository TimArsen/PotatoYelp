var Potato = require("../models/potato");
var Review = require("../models/review"); 

var middlewareObj = {};

//============================
// Check Potato Ownership
//============================

middlewareObj.checkPotatoOwnership = function(req, res, next) {
    if(req.isAuthenticated()){ // First check is user is currently logged in
        Potato.findById(req.params.id, function(err, foundPotato){ // Then find the potato in question
           if(err){
               // if Potato not found send a 404 response
               res.status(404);
           }  else {
               // Check if User owns the Potato
            if(foundPotato.author.id.equals(req.user._id)) {
                next();
            } else {
                // if User doesn't own the Potato send a 403 response
               res.status(403).send("You don't have permission to do that");
            }
           }
        });
    } else {
        // If User is not logged in send a 401 response, bringing up login 
        res.status(401).send("You must be logged in to do that");
    }
};

//============================
// Check Review Ownership
//============================

middlewareObj.checkReviewOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Review.findById(req.params.id, // Find Review in database
            function(err, foundReview){
                // if Review not found send a 404 response
                if(err){res.status(404).send(err)}
                // Check if User owns the Review
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                } else {
                    //If User doesn't own Review send a 403 response
                    res.status(403).send("You don't have permission to do that");
                }
             }
        );
    } else {
    //If User is not logged in send a 401 response
    res.status(401).send("You must be logged in to do that");
    }
};

//============================
// Check User is Logged In
//============================

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //If User is not logged in send a 401 response
    res.status(401).send("You must be logged in to do that");
};

module.exports = middlewareObj;