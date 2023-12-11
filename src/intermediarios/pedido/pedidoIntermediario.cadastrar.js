const validarPedidoCadastrar = (joiSchema) => async (req, res, next) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    await joiSchema.validateAsync({
      cliente_id,
      observacao,
      pedido_produtos,
    });
    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = validarPedidoCadastrar;
