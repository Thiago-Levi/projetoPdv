const knex = require("../../bancodedados/conexao");

const listarCategorias = async (_, res) => {
  try {
    const categorias = await knex("categorias").select("*");
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(404).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = listarCategorias;
