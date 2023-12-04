const knex = require("../../bancodedados/conexao");

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      produto = await knex("produtos").del().where({ id }).returning();
    }

    if (!produto) {
      return res.status(404).json("Não há produto com esse id");
    }

    return res.status(200).json("Produto deletado com sucesso");
  } catch (error) {
    return res.status(404).json("id do produto inválido");
  }
};

module.exports = deletarProduto;
