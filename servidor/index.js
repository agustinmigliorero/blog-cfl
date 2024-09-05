const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Base de datos conectada!");
});

//cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});

//cors

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rutas
const rutasUsuarios = require("./rutas/usuarios");
app.use("/api/usuarios", rutasUsuarios);

const rutasPublicaciones = require("./rutas/publicaciones");
app.use("/api/publicaciones", rutasPublicaciones);

//rutas

app.listen(3000, function () {
  console.log("Servidor abierto en puerto 3000");
});

app.get("/ruta", function (req, res) {
  res.send("Hola mundo");
});

fetch("http://localhost:3000/api/usuarios/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nombre: "Prueba",
    password: "123",
    email: "prueba@prueba",
  }),
});
