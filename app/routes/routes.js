var potatoRoutes    = require("./potatoRoutes");
var reviewRoutes    = require("./reviewRoutes");
var userRoutes      = require("./userRoutes");
var authRoutes      = require("./authRoutes");

module.exports = function(app) {

// Potato API Routes
app.use("/api/potatoes", potatoRoutes);
    
// Review API Routes
app.use("/api/reviews", reviewRoutes);

// User API Routes
app.use("/api/users", userRoutes);
        
// User Auth API Routes
app.use("/api/auth", authRoutes);
         

// frontend routes =========================================================
// route to handle all angular 'get' requests not caught by any APIs above 
app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
});

};
