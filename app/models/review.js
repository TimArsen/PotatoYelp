var mongoose = require('mongoose');

// define our potato model
module.exports = mongoose.model('Review', {
    rating : { type: Number, min: 1, max: 5 },
    comment : String,
    date: { type: Date, default: Date.now },
    potato : {
        id: {
         // type tells mongoose that this property is an ObjectId 
         type: mongoose.Schema.Types.ObjectId,
         // it is an ObjectId of the model exported as "Potato"
         ref: "Potato"
      },
      name: String
    },
    author: {
      id: {
         // type tells mongoose that this property is an ObjectId 
         type: mongoose.Schema.Types.ObjectId,
         // it is an ObjectId of the model exported as "User"
         ref: "User"
      },
      username: String
    }
});