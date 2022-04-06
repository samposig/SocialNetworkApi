const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
   username: {
     type: String,
     unique: true,
     required: true,
     trim: true,
   },
   email: {
    type: String,
    unique: true,
    required: true,
   },
   thoughts: [{
     type: Schema.Types.ObjectId,
     ref: "Thoughts"
   }],
   friends: [{
     type: Schema.Types.ObjectId,
     ref: "User"
   }]
  },
  
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
