const knex = require("../../bancodedados/conexao");

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  let produtos = [];
  try {
    if (id) {
      produtos = await knex("produtos").select("*").where({ id });
    }

    if (produtos.length == []) {
      return res.status(404).json("Não há produto com esse id");
    }

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(404).json("id do produto inválido");
  }
};

module.exports = detalharProduto;
