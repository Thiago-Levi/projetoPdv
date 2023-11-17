const express = require("express");
const routes = express();
const listarCategorias = require("../controladores/categoria/controladoresCategoriaListar");

routes.get("/categoria", listarCategorias);

module.exports = routes;
