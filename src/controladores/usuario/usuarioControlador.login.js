const knex = require("../../bancodedados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios")
      .select("*")
      .where("email", "=", email)
      .first();

    if (!usuario) {
      return res
        .status(404)
        .json({ mensagem: "Email ou senha não cadastrado(s)!" });
    }

    const senhaValidada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValidada) {
      return res
        .status(404)
        .json({ mensagem: "Email ou senha não cadastrado(s)!" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_INTERNA_JWT, {
      expiresIn: "10h",
    });

    return res.status(200).json({ mensagen: "Usuario Logado", token });
  } catch (error) {
    return res.status(404).json({ mensagem: error.message });
  }
};

module.exports = logarUsuario;
