//const users = [ { id: 1, name: 'Hadi Soufan' }, { id: 2, name: 'Melia Malik' }, { id: 3, name: 'Zayn Cerny' }];
const users = require("./usuarios_model.js");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res) => {
  const Users = await users.find({})
  const t = new Promise((resolve) => {
    setTimeout(() => resolve("hola"), 3000)
    });
  await t;
  res.status(200).json({ success: true, count: Users.length, data: Users});
};
// @desc    Create new user
// @route   POST /api/v1/create
// @access  Public
exports.createUser = async (req, res) => {
  const U = { "id": req.params.id, "Name": req.body.Name};
  try{
    const {name} = await users.create(U);
    //users.push({ id, name });
    res.status(201).json({ success: true, user: U, message: 'User created successfully' });
  }catch(e){
    res.status(500).json({ success: false, user: U, message: e});
  }
};
// @desc    Update a user
// @route   PATCH /api/v1/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { Name } = req.body;
  let User = await users.find({"id": id});
//  const User = users[id]
  if (User) {
    User = await users.findOneAndUpdate({"id": id}, {"Name": Name})
    res.status(201).json({ message: 'User updated successfully', User });
  } else {
    res.status(404).json({ message: `User with ID ${id} not found` });
  }
};
// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const db = await users.findOneAndDelete({"id": id})
  if (db) {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: `User with ID ${id} not found` });
  }
};