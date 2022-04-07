const { Schema, model, Types } = require('mongoose');

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
      },
    },
      {
          toJSON: {
          virutals: true,
      },
      id: false,
    }
  );

  const Reaction = model("reaction", reactionSchema);
  module.exports = reactionSchema;