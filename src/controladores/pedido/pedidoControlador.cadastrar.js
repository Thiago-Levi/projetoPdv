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

    const existeProdutoComEstoqueInsuficiente = produtosDoPedido.some(
      (produtoDoPedido, index) => {
        if (produtoDoPedido.id === pedido_produtos[index].produto_id) {
          if (
            produtoDoPedido.quantidade_estoque <
            pedido_produtos[index].quantidade_produto
          ) {
            return true;
          }

          return false;
        }

        return false;
      }
    );

    if (existeProdutoComEstoqueInsuficiente) {
      return res
        .status(404)
        .json(
          "Existe algum produto com uma quantidade insufuciente no estoque"
        );
    }

    const produtosComSubtotais = produtosDoPedido.map(
      (produtoDoPedido, index) => {
        if (produtoDoPedido.id === pedido_produtos[index].produto_id) {
          return {
            ...produtoDoPedido,
            quantidade_produto_neste_pedido:
              pedido_produtos[index].quantidade_produto,
            subtotal:
              pedido_produtos[index].quantidade_produto * produtoDoPedido.valor,
          };
        }
      }
    );

    const valorTotalPedido = produtosComSubtotais.reduce(
      (acc, { subtotal }) => (acc += subtotal),
      0
    );

    const pedido = await knex("pedidos")
      .insert({
        cliente_id,
        valor_total: valorTotalPedido,
        observacao,
      })
      .returning("id");

    produtosComSubtotais.forEach(
      async ({ id, quantidade_produto_neste_pedido, valor }) => {
        return await knex("pedido_produtos").insert({
          pedido_id: pedido[0].id,
          produto_id: id,
          quantidade_produto: quantidade_produto_neste_pedido,
          valor_produto: valor,
        });
      }
    );

    return res.status(200).json("Pedido cadastrado com sucesso!");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = cadastrarPedido;
