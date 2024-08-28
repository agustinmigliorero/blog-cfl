const {
  crearUsuario,
  verUsuarios,
  verUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controladores/usuarios");
const express = require("express");
const router = express.Router();

router.get("/", verUsuarios);
router.get("/:id", verUsuario);
router.post("/", crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
