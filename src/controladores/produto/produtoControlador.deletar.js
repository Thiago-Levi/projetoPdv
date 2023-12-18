const knex = require("../../bancodedados/conexao");

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const existeProdutoVinculadoAAlgumPedido = await knex("pedido_produtos")
      .where("produto_id", "=", id)
      .select("*");

    if (existeProdutoVinculadoAAlgumPedido.length != 0) {
      return res
        .status(404)
        .json(
          "Este produto está vinculado a pedidos, por tanto, não pode ser excluído."
        );
    }

    if (id) {
      produto = await knex("produtos").del().where({ id }).returning();
    }

    if (!produto) {
      return res.status(404).json("Não há produto com esse id");
    }

    return res.status(200).json("Produto deletado com sucesso");
  } catch (error) {
    console.log(error.message);
    return res.status(404).json("id do produto inválido");
  }
};

module.exports = deletarProduto;
