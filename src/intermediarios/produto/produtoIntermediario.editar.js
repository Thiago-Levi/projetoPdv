const validarProdutoEditar = (joiEsquema) => async (req, res, next) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  try {
    await joiEsquema.validateAsync({
      id,
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

module.exports = validarProdutoEditar;
