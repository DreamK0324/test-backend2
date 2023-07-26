const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        require: true,
      },
    
      lastname: {
        type: String,
        require: true,
      },
    
      email: {
        type: String,
        require: true,
      },
    
      imageUrl: {
        type: String,
      },

      movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;