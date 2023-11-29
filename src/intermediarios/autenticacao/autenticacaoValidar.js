const jwt = require("jsonwebtoken");
const knex = require("../../bancodedados/conexao");
const validarAutenticacao = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const tokenValidado = jwt.verify(token, process.env.SENHA_INTERNA_JWT);

    const usuario = await knex("usuarios")
      .where("id", "=", tokenValidado.id)
      .first("id", "nome", "email");

    if (!usuario) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = validarAutenticacao;
