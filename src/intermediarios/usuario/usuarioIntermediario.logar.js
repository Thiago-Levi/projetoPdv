const validarUsuarioLogar = (joiEsquema) => async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    await joiEsquema.validateAsync({
      email,
      senha,
    });

    next();
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = validarUsuarioLogar;
