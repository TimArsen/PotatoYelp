var express     = require("express");
var router      = express.Router();
var User        = require('../models/user');


// Index route
router.get('/api/users', 
    function(req, res) {
        User.find(function(err, users) {// Get all users in the database
            // Handle errors
            if (err){res.send(err)}
            res.json(users); // return all users in JSON format
    });
});

// Create route
router.post('/api/users', 
    function(req, res){
        User.create(req.body, // Create User
            function(err, newUser){
                // Handle errors
                if (err){res.send(err)}
                // return new user in JSON format
                res.json(newUser); 
            }
        );
    }
);

// Show Route
router.get('/api/users/:id', 
    function(req, res){
        User.findById(req.params.id, // Find User in database
            function(err, user){
                // Handle errors
                if (err){res.send(err)}
                // return user in JSON format
                res.json(user); 
            }
        );
    }
);

// Update route
router.put('/api/users/:id', 
    function(req, res){
        User.findByIdAndUpdate(req.params.id, req.body,  // Find User and update
            function(err, updatedUser){
                // Handle errors
                if (err){res.send(err)}
                // return updated user in JSON format
                res.json(updatedUser); 
    });
});

// Delete Route
router.delete('/api/users/:id', 
    function(req, res){
        User.findByIdAndRemove(req.params.id, // Find User and Delete
            function(err){
                // Handle errors
                if (err){res.send(err)}
            }
        );
    }
);

module.exports = router;