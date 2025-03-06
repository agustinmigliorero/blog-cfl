const Usuario = require("../modelos/usuario");

async function validarUsuarioLogeado(req, res, next) {
  if (req.user) {
    const usuario = await Usuario.findById(req.user._id);
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    next();
  } else {
    return res.status(401).json({ error: "No autenticado" });
  }
}

module.exports = { validarUsuarioLogeado };
