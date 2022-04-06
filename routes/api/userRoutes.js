const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateuser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/User
router.route('/').get(getAllUsers).post(createUser);

// /api/User/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateuser)
  .delete(deleteUser);

module.exports = router;
