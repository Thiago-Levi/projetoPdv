const detalharPerfilUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (error) {
    return res.status(404).json("Usuário logado inválido");
  }
};

module.exports = detalharPerfilUsuario;
