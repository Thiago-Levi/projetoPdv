const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    return res.status(200).json();
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = cadastrarPedido;
