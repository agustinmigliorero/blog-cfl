const Usuario = require("../modelos/usuario");

const crearUsuario = async (req, res) => {
  const { nombre, password, email } = req.body;
  const usuario = new Usuario({ nombre, password, email });
  await usuario.save();
  res.json({ usuario, mensaje: "Usuario creado!" });
};

const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

module.exports = { crearUsuario, verUsuarios };
