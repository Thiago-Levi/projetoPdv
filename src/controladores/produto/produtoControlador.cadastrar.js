const knex = require("../../bancodedados/conexao");

const cadatrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const existeCategoria_id = await knex("categorias")
      .where("id", "=", categoria_id)
      .first("id");

    if (!existeCategoria_id) {
      return res.status(404).json("Campo categoria_id inválido.");
    }

    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(200).json("Produto Cadastrado");
  } catch (error) {
    return res.status(401).json("Esse produto não pode ser cadastrado.");
  }
};

module.exports = cadatrarProduto;
