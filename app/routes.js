var User        = require('./models/user');
var passport    = require('passport');
var potatoRoutes= require("./routes/potatoRoutes");
var reviewRoutes= require("./routes/reviewRoutes");
var userRoutes= require("./routes/userRoutes");

module.exports = function(app) {

// Potato API Routes
app.use("/api/potatoes", potatoRoutes);
    
// Review API Routes
app.use("/api/reviews", reviewRoutes);

// User API Routes
app.use("/api/users", userRoutes);
        
    
    //User API Routes ==========================================================
        
        
        
        
        // User Auth Routes =======================================================
        
        // Create User
        app.post("/register", function(req, res){
            console.log(req.body);
            var newUser = new User({username: req.body.username});
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    res.send(err);
                }
                passport.authenticate("local")(req, res, function(){
                   //req.flash("success", "Welcome to YelpCamp " + user.username);
                   res.json(user); 
                });
            }); 
        });
        
        // Login
        app.post('/login', passport.authenticate('local'),
            function(req, res) {
                res.send(req.user); 
            }
        );
        
        // Logout
        app.get("/logout", function(req, res){
            req.logout();
            res.redirect("/potatoes");
        });

        // frontend routes =========================================================
        // route to handle all angular 'get' requests not caught by any get methods above 
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
