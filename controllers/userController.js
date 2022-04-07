const res = require('express/lib/response');
const { User, Thoughts } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((userDB) => res.json(userDB))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((userDB) =>
        !userDB
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(userDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((userDB) => res.json(userDB))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userDB) =>
        !userDB
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: userDB.Thoughts } })
      )
      .then(() => res.json({ message: 'user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateuser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userDB) =>
        !userDB
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(userDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriendToUser(req, res) {
    User.findOneAndUpdate(
    {_id: req.params.userId,
      friends: {$ne: req.params.friendId},
    },
      {$push: {friends: req.params.friendId}
    },
    {
      new: true,
      unique: true
    }
    )
      res.json({message: 'Friend Added'});
  },
  deleteFriendFromUser(req, res) {
    User.findOneAndUpdate(
    {_id: req.params.userId,
      friends: {$ne: req.params.friendId},
    },
      {$pull: {friends: req.params.friendId}
    },
    {
      new: true,
      unique: true
    }
    )
      res.json({message: 'Friend Deleted'});
  },
};


