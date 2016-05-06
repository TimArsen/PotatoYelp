var Potato = require("../models/potato");
var Review = require("../models/review"); 

var middlewareObj = {};

middlewareObj.checkPotatoOwnership = function(req, res, next) {
    if(req.isAuthenticated()){ // First check is user is currently logged in
        Potato.findById(req.params.id, function(err, foundPotato){ // Then find the potato in question
           if(err){
               //req.flash("error", "Potato not found");
               res.redirect("back");
           }  else {
               // does user own the Potato?
            if(foundPotato.author.id.equals(req.user._id)) {
                next();
            } else {
                //req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        //req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkReviewOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundReview.author.id.equals(req.user._id)) {
                next();
            } else {
                //req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        //req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //req.flash("error", "You need to be logged in to do that");
    res.send("You need to be logged in to do that");
};

module.exports = middlewareObj;