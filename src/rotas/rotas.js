const express = require("express");
const routes = express();
/////esquemas de validações////
const esquemaUsuarioCadastrar = require("../validadores/esquema.usuario");

////Controladores ////
const listarCategorias = require("../controladores/categoria/categoriaControlador.listar");
const cadastrarUsuario = require("../controladores/usuario/usuarioControlador.cadastrar");

///// Intermediários ////
const validarUsuarioCadatrar = require("../intermediarios/usuario/usuarioIntermediario.cadastrar");

routes.get("/categoria", listarCategorias);

routes.post(
  "/usuario",
  validarUsuarioCadatrar(esquemaUsuarioCadastrar),
  cadastrarUsuario
);

module.exports = routes;
