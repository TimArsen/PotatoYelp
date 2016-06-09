var express     = require("express");
var router      = express.Router();
var Potato      = require('../models/potato');
var middleware  = require("../middleware/middleware");

   
// Potato API Routes =======================================================
    
    // Index route
    router.get('/', 
        function(req, res) {

            Potato.find()
                .populate("reviews")    // add reviews to the potato
                    .lean() //convert mongoose document into plain object so that properties can be changed
                        .exec(function(err, potatoes) { // Find all Potatoes in the database
                            // Handle errors
                            if (err){console.log(err)}
                            
                            // Append Ratings
                            function appendRatings(element, index, array){
                                var totRating = 0;
                                element.reviews.forEach(function(review){
                                    totRating +=  review.rating;
                                });
                                
                                element.num_of_reviews = element.reviews.length;
                                element.average_rating = (totRating/element.num_of_reviews).toFixed(1);
                            }
                            
                            potatoes.forEach(appendRatings);
                
                            // return all potatoes in JSON format  
                            res.json(potatoes); 
                        });
        });

    // Create route
    router.post('/', 
        middleware.isLoggedIn, // Check if User is logged in
        function(req, res){
            var potato = req.body; // create potato
            potato.author = { id: req.user._id, username: req.user.username}; // add potato author
            Potato.create(potato, function(err, newPotato){ // create potato in database
                // Handle errors
                if (err){res.send(err)}
                // return new potato in JSON format
                res.json(newPotato); 
        });
    });
    
    // Show Route
    router.get('/:id',
        function(req, res){
            Potato.findById(req.params.id) // Lookup Potato in database
                .populate("reviews")    // add reviews to the potato
                    .lean() //convert mongoose document into plain object so that properties can be changed
                        .exec(function(err, potato){
                            // Handle errors
                            if(err) {res.send(err)}
                            
                            // Add average rating & num of reviews
                            var totRating = 0;
                            for (var i=0; i < potato.reviews.length; i++){
                                totRating +=  potato.reviews[i].rating;
                            }
                            potato.num_of_reviews = potato.reviews.length;
                            potato.average_rating = (totRating/potato.num_of_reviews).toFixed(1);
                            
                            potato.dateCreated = potato.date.toLocaleDateString();
                            
                            // return potato in JSON format
                            res.json(potato);
                    });
    });
    
    // Update route
    router.put('/:id', 
        middleware.checkPotatoOwnership, // Check if User owns Potato
        function(req, res){
            console.log(req.params.id);
           Potato.findByIdAndUpdate(req.params.id, req.body, //Find Potato and update in database
                function(err, newPotato){
                // Handle errors
                if(err) {console.log(err)}
                // return updated potato in JSON format
                console.log(newPotato);
                res.json(newPotato);
        });
    });
    
    // Delete Route
    router.delete('/:id',
        middleware.checkPotatoOwnership, // Check if User owns potato
        function(req, res){
            Potato.findByIdAndRemove(req.params.id, // Find Potato and delete it from the database
                function(err){
                // Handle Errors
                if(err){console.log(err)}
                // respond that Potato has been deleted
                res.send("Potato successfully deleted");
        });
    });
        
module.exports = router; 