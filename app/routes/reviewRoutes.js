var express     = require("express");
var router      = express.Router();
var Review      = require('../models/review');
var Potato      = require('../models/potato');
var middleware  = require("../middleware/middleware");

// Review API Routes

// Create Review route
router.post('/', 
    middleware.isLoggedIn, // Check if User is logged in
        function(req, res){
            Potato.findById(req.body.potato.id) // Find Potato in database
                .populate("reviews")    // add Reviews to Potato
                    .exec(function(err, potato){
                        //  Handle errors
                        if(err){res.send(err)}
                        // Create blank Review
                        Review.create(req.body, 
                            function(err, newReview){
                                //  Handle errors
                                if(err){res.send(err)}
                                // Build Review
                                newReview.author.id = req.user._id;
                                newReview.author.username = req.user.username;
                                newReview.save(); // Save Review
                                // Add Review to Potato
                                potato.reviews.push(newReview); 
                                potato.save(); // Save Potato
                                updatePotatoRatings(potato._id); // Update Potato ratings
                                // Return new Review 
                                res.json(newReview); 
                            });
                    });
        }
);

// Show Route
router.get('/:id', 
    function(req, res){
        Review.findById(req.params.id, // Find Review in database
            function(err, review){
                //  Handle errors
                if(err){res.send(err)}
                // return review in JSON format
                res.json(review);
            });
    }
);

// Update route
router.put('/:id', 
    middleware.checkReviewOwnership, // Check that User owns Review
        function(req, res){
            Review.findByIdAndUpdate(req.params.id, req.body, // Find Review in database and update
                function(err, review){
                    //  Handle errors
                    if(err){res.send(err)}
                    updatePotatoRatings(review.potato.id); // Update Potato ratings
                    // return updated review in JSON format
                    res.json(review);
                }
            );
        }
);

// Delete Route
router.delete('/:id', 
    middleware.checkReviewOwnership, // Check that User owns Review
        function(req, res){
            Review.findById(req.params.id, // Find Review in database (to grab potato ID for updating reviews)
                function(err, review){
                    //  Handle errors
                    if(err){res.send(err)}
                    // Delete Review from database
                    Review.findByIdAndRemove(req.params.id, function(err){
                        //  Handle errors
                        if(err){res.send(err)}
                        // Respond if successful
                        res.send("Review successfully deleted");
                    });
                    updatePotatoRatings(review.potato.id); // Update Potato ratings
                }
            );
        }
);

var updatePotatoRatings = function(potatoId){
    Potato.findById(potatoId) // Find Potato in database
                .populate("reviews")    // add Reviews to Potato
                    .exec(function(err, potato){ 
                        //  Handle errors
                        if(err){return(err)}
                        // add up Potato ratings
                        var total_rating = 0;
                        potato.reviews.forEach(function(review){
                            if(review.rating){
                                total_rating += review.rating;
                            }
                        });
                        // set num of ratings
                        potato.num_of_reviews = potato.reviews.length;
                        // set average rating (total_ratings / num of reviews)
                        potato.average_rating = (total_rating/potato.num_of_reviews).toFixed(1);
                        // save Potato
                        potato.save();
                    });
};

module.exports = router;
