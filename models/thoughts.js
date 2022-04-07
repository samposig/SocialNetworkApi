const { Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtsSchema = new Schema(
  {
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    getters: true,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    reactionSchema
  ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


thoughtsSchema.virtual("reactionSchema").get(function (){
  return this.reactions.length;
})

const Thoughts = model("thoughts", thoughtsSchema);
module.exports = Thoughts;
