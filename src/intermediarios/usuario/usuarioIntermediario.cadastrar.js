const validarUsuarioCadatrar = (joiEsquema) => async (req, res, next) => {
  const { nome, email, senha } = req.body;

  try {
    await joiEsquema.validateAsync({
      nome,
      email,
      senha,
    });

    next();
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = validarUsuarioCadatrar;
