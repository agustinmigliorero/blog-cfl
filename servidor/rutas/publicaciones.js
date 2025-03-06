const express = require("express");
const router = express.Router();
const {
  crearPublicacion,
  verPublicaciones,
  verPublicacion,
  editarPublicacion,
  eliminarPublicacion,
  darLike,
} = require("../controladores/publicaciones");
const { validarUsuarioLogeado } = require("../middlewares/middlewares");

router.get("/", verPublicaciones);
router.get("/:id", verPublicacion);
router.get("/hola", verPublicaciones);
router.post("/", validarUsuarioLogeado, crearPublicacion);
router.put("/:id", editarPublicacion);
router.delete("/:id", eliminarPublicacion);
router.post("/:id/likes", darLike);

module.exports = router;
