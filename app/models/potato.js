// grab the mongoose module
var mongoose = require('mongoose');

// define our potato model
module.exports = mongoose.model('Potato', {
    name : String,
    image : String,
    description: String,
    country_of_origin: String,
    best_use: String,
    wikipedia_link: String,
    date: { type: Date, default: Date.now },
    author: {
      id: {
         // type tells mongoose that this property is an ObjectId 
         type: mongoose.Schema.Types.ObjectId,
         // it is an ObjectId of the model exported as "User"
         ref: "User"
      },
      username: String
    },
    reviews: [
        {
        // type tells mongoose that this property is an ObjectId 
         type: mongoose.Schema.Types.ObjectId,
         // it is an ObjectId of the model exported as "User"
         ref: "Review"
    }
    ],
    average_rating: { type: Number, min: 1, max: 5 },
    num_of_reviews: Number
});