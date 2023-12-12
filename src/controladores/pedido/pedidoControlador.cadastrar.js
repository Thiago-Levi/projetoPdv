const knex = require("../../bancodedados/conexao");
const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const existeCliente_id = await knex("clientes")
      .where("id", "=", cliente_id)
      .first();

    if (!existeCliente_id) {
      return res.status(401).json("cliente_id inválido.");
    }

    const produtosDoPedido = await Promise.all(
      pedido_produtos.map(async (pedido_produto) => {
        return await knex("produtos")
          .where("id", "=", pedido_produto.produto_id)
          .first("*");
      })
    );

    const algumProduto_idInexistente = produtosDoPedido.some(
      (produtoDoPedido) => produtoDoPedido === undefined
    );

    if (algumProduto_idInexistente) {
      return res.status(404).json("Existe algum produto_id inválido.");
    }

    //Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
    return res.status(200).json();
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = cadastrarPedido;
