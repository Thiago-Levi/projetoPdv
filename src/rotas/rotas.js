const express = require("express");
const routes = express();

//////////// upload de arquivo /////////////
const multer = require("../servicos/multer");

/////Impotações de esquemas de validações de entidades////
const esquemaUsuario = require("../validadores/esquema.usuario");
const esquemaProduto = require("../validadores/esquema.produto");
const esquemaCliente = require("../validadores/esquema.cliente");
const esquemaPedido = require("../validadores/esquema.pedido");

////Impotações de Controladores ////
const listarCategorias = require("../controladores/categoria/categoriaControlador.listar");
const cadastrarUsuario = require("../controladores/usuario/usuarioControlador.cadastrar");
const logarUsuario = require("../controladores/usuario/usuarioControlador.login");
const cadastrarProduto = require("../controladores/produto/produtoControlador.cadastrar");
const editarProduto = require("../controladores/produto/produtoControlador.editar");
const listarProdutos = require("../controladores/produto/produtoControlador.listar");
const detalharProduto = require("../controladores/produto/produtoControlador.detalhar");
const deletarProduto = require("../controladores/produto/produtoControlador.deletar");
const cadastrarCliente = require("../controladores/cliente/clienteControlador.cadastrar");
const listarClientes = require("../controladores/cliente/clienteControlador.listar");
const detalharCliente = require("../controladores/cliente/clienteControlador.detalhar");
const editarCliente = require("../controladores/cliente/clienteControlador.editar");
const cadastrarPedido = require("../controladores/pedido/pedidoControlador.cadastrar");
const listarPedido = require("../controladores/pedido/pedidoControlador.listar");
///// Impotações de Intermediários ////
const validarUsuarioCadatrar = require("../intermediarios/usuario/usuarioIntermediario.cadastrar");
const validarUsuarioLogar = require("../intermediarios/usuario/usuarioIntermediario.logar");
const validarAutenticacao = require("../intermediarios/autenticacao/autenticacaoValidar");
const validarProdutoCadatrar = require("../intermediarios/produto/produtoIntermediario.cadastrar");
const validarProdutoEditar = require("../intermediarios/produto/produtoIntermediario.editar");
const validarClienteCadastrar = require("../intermediarios/cliente/clienteIntermediario.cadastrar");
const validarClienteEditar = require("../intermediarios/cliente/clienteIntermediario.editar");
const validarPedidoCadastrar = require("../intermediarios/pedido/pedidoIntermediario.cadastrar");
///// Rotas /////
routes.get("/categoria", listarCategorias);

routes.post(
  "/usuario",
  validarUsuarioCadatrar(esquemaUsuario.cadastrar),
  cadastrarUsuario
);

routes.post("/login", validarUsuarioLogar(esquemaUsuario.logar), logarUsuario);

routes.use(validarAutenticacao);

//////////////////////////////////////////////

routes.post(
  "/produto",
  multer.single("produto_imagem"),
  validarProdutoCadatrar(esquemaProduto.cadastrar),
  cadastrarProduto
);
routes.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  validarProdutoEditar(esquemaProduto.editar),
  editarProduto
);

routes.get("/produto", listarProdutos);
routes.get("/produto/:id", detalharProduto);
routes.delete("/produto/:id", deletarProduto);

routes.post(
  "/cliente",
  validarClienteCadastrar(esquemaCliente.cadastrar),
  cadastrarCliente
);

routes.get("/cliente", listarClientes);
routes.get("/cliente/:id", detalharCliente);
routes.put(
  "/cliente/:id",
  validarClienteEditar(esquemaCliente.editar),
  editarCliente
);

routes.post(
  "/pedido",
  validarPedidoCadastrar(esquemaPedido.cadastrar),
  cadastrarPedido
);

routes.get("/pedido", listarPedido);

module.exports = routes;
