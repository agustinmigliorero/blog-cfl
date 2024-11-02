const Publicacion = require("../modelos/publicacion");
const Usuario = require("../modelos/usuario");
const Comentario = require("../modelos/comentario");

const crearPublicacion = async (req, res) => {
  const { usuario, titulo, texto } = req.body;
  const publicacion = new Publicacion({ usuario, titulo, texto });
  await publicacion.save();
  const usuarioActual = await Usuario.findById(publicacion.usuario);
  usuarioActual.publicaciones.push(publicacion._id);
  await usuarioActual.save();
  res.json({ publicacion, mensaje: "Publicacion creada!" });
};

const verPublicaciones = async (req, res) => {
  const publicaciones = await Publicacion.find().populate({
    path: "usuario",
    select: "nombre",
  });
  res.json(publicaciones);
};

const verPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id)
    .populate("usuario")
    .populate({
      path: "comentarios",
      populate: {
        path: "usuario",
      },
    });

  res.json(publicacion);
};

const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { titulo, texto } = req.body;
  const publicacion = await Publicacion.findByIdAndUpdate(id, {
    titulo,
    texto,
  });
  publicacion.fechaEdicion = Date.now();
  await publicacion.save();
  res.json({ publicacion, mensaje: "Publicacion actualizada!" });
};

const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);
  const usuario = await Usuario.findById(publicacion.usuario);
  usuario.publicaciones = usuario.publicaciones.filter(
    (publicacionId) => publicacionId.toString() !== id
  );
  await usuario.save();
  const comentarios = await Comentario.deleteMany({
    publicacion: publicacion._id,
  });
  res.json({ publicacion, mensaje: "Publicacion eliminada!" });
};

const darLike = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id);
  const usuario = await Usuario.findById(req.user._id);
  if (!publicacion.likes.includes(req.user._id)) {
    publicacion.likes.push(req.user._id);
    usuario.likes.push(publicacion._id);
    await publicacion.save();
    await usuario.save();
    res.json({ publicacion, mensaje: "Like dado!" });
  } else {
    publicacion.likes = publicacion.likes.filter(
      (likeId) => likeId.toString() !== req.user._id.toString()
    );
    usuario.likes = usuario.likes.filter(
      (likeId) => likeId.toString() !== publicacion._id.toString()
    );
    await publicacion.save();
    await usuario.save();
    res.json({ publicacion, mensaje: "Like quitado!" });
  }
};

module.exports = {
  crearPublicacion,
  verPublicaciones,
  verPublicacion,
  editarPublicacion,
  eliminarPublicacion,
  darLike,
};
