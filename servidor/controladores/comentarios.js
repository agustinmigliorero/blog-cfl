const Comentario = require("../modelos/comentario");
const Usuario = require("../modelos/usuario");
const Publicacion = require("../modelos/publicacion");

const crearComentario = async (req, res) => {
  const { publicacion, usuario, texto, puntuacion } = req.body;
  const nuevoComentario = new Comentario({
    publicacion,
    usuario,
    texto,
    puntuacion,
  });
  const publicacionActual = await Publicacion.findById(publicacion);
  publicacionActual.comentarios.push(nuevoComentario._id);
  await publicacionActual.save();
  const usuarioActual = await Usuario.findById(usuario);
  usuarioActual.comentarios.push(nuevoComentario._id);
  await usuarioActual.save();
  await nuevoComentario.save();
  res.json({ nuevoComentario, mensaje: "Comentario creado!" });
};

const editarComentario = async (req, res) => {
  const { id } = req.params;
  const { texto, puntuacion } = req.body;
  const comentario = await Comentario.findByIdAndUpdate(id, {
    texto,
    puntuacion,
  });
  comentario.fechaEdicion = Date.now();
  await comentario.save();
  res.json({ comentario, mensaje: "Comentario actualizado!" });
};

const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const comentario = await Comentario.findByIdAndDelete(id);
  const publicacion = await Publicacion.findById(comentario.publicacion);
  publicacion.comentarios = publicacion.comentarios.filter(
    (comentarioId) => comentarioId.toString() !== id
  );
  await publicacion.save();
  const usuario = await Usuario.findById(comentario.usuario);
  usuario.comentarios = usuario.comentarios.filter(
    (comentarioId) => comentarioId.toString() !== id
  );
  await usuario.save();
  res.json({ comentario, mensaje: "Comentario eliminado!" });
};

module.exports = { crearComentario, editarComentario, eliminarComentario };
