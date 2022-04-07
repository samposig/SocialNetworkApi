const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateuser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUser,
} = require('../../controllers/userController.js');

// /api/User
router
.route('/')
.get(getAllUsers)
.post(createUser);

// /api/User/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateuser)
  .delete(deleteUser);

router
  .route('./:id/friends/:friendId')
  .post(addFriendToUser)
  .delete(deleteFriendFromUser)

module.exports = router;
