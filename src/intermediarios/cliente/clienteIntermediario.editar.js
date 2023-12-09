const validarClienteEditar = (joiEsquema) => async (req, res, next) => {
  const {
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    usuario_id,
  } = req.body;

  try {
    await joiEsquema.validateAsync({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      usuario_id,
    });

    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

module.exports = validarClienteEditar;
