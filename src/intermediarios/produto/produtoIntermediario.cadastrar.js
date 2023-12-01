const validarProdutoCadatrar = (joiEsquema) => async (req, res, next) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  try {
    await joiEsquema.validateAsync({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    next();
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = validarProdutoCadatrar;
