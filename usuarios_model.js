const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, "Debe ser un id unico"]
  },
  Name: {
    type: String,
    required: [true, "Debe ser el nombre de usuario"]
  }
});

const Usuarios = mongoose.model("Users", usuariosSchema);
module.exports = Usuarios;