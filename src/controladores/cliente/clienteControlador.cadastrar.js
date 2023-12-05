const knex = require("../../bancodedados/conexao");

const cadatrarCliente = async (req, res) => {
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
    const existeEmail = await knex("clientes")
      .where("email", "=", email)
      .first("email");

    if (existeEmail) {
      return res.status(401).json("Email ou CPF já existente(s)");
    }

    const existeCpf = await knex("clientes")
      .where("cpf", "=", cpf)
      .first("cpf");

    if (existeCpf) {
      return res.status(401).json("Email ou CPF já existente(s)");
    }

    await knex("clientes").insert({
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

    return res.status(200).json("Cliente cadastrado.");
  } catch (error) {
    return res.status(401).json("Esse cliente não pode ser cadastrado.");
  }
};

module.exports = cadatrarCliente;
