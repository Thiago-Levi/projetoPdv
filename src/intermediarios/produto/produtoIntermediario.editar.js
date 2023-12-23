const validarProdutoEditar = (joiEsquema) => async (req, res, next) => {
  const { descricao } = req.body;
  let { quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  quantidade_estoque = Number(quantidade_estoque);
  valor = Number(valor);
  categoria_id = Number(categoria_id);

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
