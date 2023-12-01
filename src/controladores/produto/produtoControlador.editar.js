const knex = require("../../bancodedados/conexao");

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  try {
    const existe_id = await knex("produtos").where("id", "=", id).first("id");

    const existe_categoria_id = await knex("categorias")
      .where("id", "=", categoria_id)
      .first("id");

    if (!existe_id) {
      return res.status(401).json("Campo id inválido.");
    }

    if (!existe_categoria_id) {
      return res.status(401).json("Campo categoria_id inválido.");
    }

    await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(200).json("Produto atualizado/editado com sucesso");
  } catch (error) {
    return res
      .status(401)
      .json("Esse produto não pode ser editado/atualizado.");
  }
};

module.exports = editarProduto;
