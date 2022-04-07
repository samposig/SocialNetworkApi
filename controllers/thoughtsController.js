
const { Thoughts, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find()
      .then((thoughtsDB) => res.json(thoughtsDB))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtsDB) =>
        !thoughtsDB
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtsDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughtsDB) => res.json(thoughtsDB))
      .catch((err) => res.status(500).json(err));
  },
  //delete thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughtsDB) =>
        !thoughtsDB
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Reactions.deleteMany({ _id: { $in: thoughtsDB.Thoughts } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtsDB) =>
        !thoughtsDB
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughtsDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
    {_id: req.params.thoughtsId,
      reactions: {$ne: req.params.reactionId},
    },
      {$push: {reactions: req.params.reactionId}
    },
    {
      new: true,
      unique: true
    }
    )
      res.json({message: 'Reaction Added'});
  },
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
    {_id: req.params.thoughtsId,
      reactions: {$ne: req.params.reactionId},
    },
      {$pull: {reactions: req.params.reactionId}
    },
    {
      new: true,
      unique: true
    }
    )
      res.json({message: 'Reaction Deleted'});
  },
}
