const express = require("express");
const router = express.Router();
const {
  crearComentario,
  editarComentario,
  eliminarComentario,
} = require("../controladores/comentarios");

router.post("/", crearComentario);
router.put("/:id", editarComentario);
router.delete("/:id", eliminarComentario);

module.exports = router;
