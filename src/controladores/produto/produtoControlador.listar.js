const knex = require("../../bancodedados/conexao");
const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  let produtos = [];

  try {
    if (categoria_id) {
      produtos = await knex("produtos").select("*").where({ categoria_id });
    }

    if (!categoria_id) {
      produtos = await knex("produtos").select("*");
    }

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(404).json("produto  ou categoria_id inválido(s)");
  }
};

module.exports = listarProdutos;
