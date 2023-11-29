const express = require("express");
const routes = express();
/////esquemas de validações de entidades////
const esquemaUsuario = require("../validadores/esquema.usuario");

////Controladores ////
const listarCategorias = require("../controladores/categoria/categoriaControlador.listar");
const cadastrarUsuario = require("../controladores/usuario/usuarioControlador.cadastrar");
const logarUsuario = require("../controladores/usuario/usuarioControlador.login");
const cadastrarProduto = require("../controladores/produto/produtoControlador.cadastrar");

///// Intermediários ////
const validarUsuarioCadatrar = require("../intermediarios/usuario/usuarioIntermediario.cadastrar");
const validarUsuarioLogar = require("../intermediarios/usuario/usuarioIntermediario.logar");
const validarAutenticacao = require("../intermediarios/autenticacao/autenticacaoValidar");

///// Rotas /////
routes.get("/categoria", listarCategorias);

routes.post(
  "/usuario",
  validarUsuarioCadatrar(esquemaUsuario.cadastrar),
  cadastrarUsuario
);

routes.post("/login", validarUsuarioLogar(esquemaUsuario.logar), logarUsuario);

routes.use(validarAutenticacao);

routes.post("/produto", cadastrarProduto);

module.exports = routes;
