const bcrypt = require("bcrypt");
const knex = require("../../bancodedados/conexao");

const editarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const jaExisteEmail = await knex("usuarios")
      .select("email")
      .where("email", "=", email)
      .first();

    if (jaExisteEmail) {
      return res.status(403).json({ mensagem: "Email inválido!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .where("id", "=", req.usuario.id)
      .update({ nome, email, senha: senhaCriptografada });

    return res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = editarPerfilUsuario;
