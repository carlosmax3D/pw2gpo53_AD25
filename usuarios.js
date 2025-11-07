const express = require('express'); 
const router = express.Router()
router.use((req, res, next) => {
  next()
})
const { getUsers, 
    createUser,
    updateUser, 
    deleteUser } = require('./usuarios_controller');
router.route("/users").get(getUsers);
router.route('/users/:id')
  .post(createUser)
  .patch(updateUser) // Update: Update a user by ID
  .delete(deleteUser); // Delete: Delete a user by ID

router.get('/', (req, res) => {
  res.send('Users home page')
})
router.get('/about', (req, res) => {
  res.send('About users')
})
module.exports = router