const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  titulo: String,
  texto: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaEdicion: { type: Date, default: Date.now },
  comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
});

module.exports = mongoose.model("Publicacion", publicacionSchema);
