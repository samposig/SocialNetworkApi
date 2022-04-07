const { Schema, model} = require('mongoose');

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

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  }
)
// thoughtsSchema.virtual("reactionSchema").get(function (){
//   return this.reactions.length;
// })

const Thoughts = model("thoughts", thoughtsSchema);
module.exports = Thoughts;
