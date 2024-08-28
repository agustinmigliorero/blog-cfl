const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Base de datos conectada!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rutas
const rutasUsuarios = require("./rutas/usuarios");
app.use("/api/usuarios", rutasUsuarios);

//rutas

app.listen(3000, function () {
  console.log("Servidor abierto en puerto 3000");
});
