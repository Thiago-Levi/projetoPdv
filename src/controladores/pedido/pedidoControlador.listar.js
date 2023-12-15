const knex = require("../../bancodedados/conexao");

const listarPedido = async (req, res) => {
  const { cliente_id } = req.query;
  let buscaPedidos = knex("pedidos");

  try {
    if (cliente_id) {
      buscaPedidos = buscaPedidos.where({ cliente_id });
    }

    const pedidosPorClienteOuClientes = await buscaPedidos;

    const listaPedidosPorClienteComSeusProdutos = await Promise.all(
      pedidosPorClienteOuClientes.map(async (pedido) => {
        const pedido_produtos = await knex("pedido_produtos")
          .where("pedido_id", "=", pedido.id)
          .select("*");

        return {
          pedido,
          pedido_produtos,
        };
      })
    );
    return res.status(200).json(listaPedidosPorClienteComSeusProdutos);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = listarPedido;
