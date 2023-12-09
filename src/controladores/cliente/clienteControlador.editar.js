const knex = require("../../bancodedados/conexao");

const editarCliente = async (req, res) => {
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

  const { id } = req.params;

  const existeCliente = await knex("clientes").where({ id }).first();

  if (!existeCliente) {
    return res.status(401).json("Id inexistente.");
  }

  const existeEmail = await knex("clientes").where({ email }).first();

  if (existeEmail) {
    return res.status(401).json("O email já existe ou é inválido");
  }

  const existeCPF = await knex("clientes").where({ cpf }).first();

  if (existeCPF) {
    return res.status(401).json("O CPF já existe ou é inválido");
  }

  await knex("clientes").where({ id }).update({
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

  try {
    return res.status(200).json("Cliente editado com sucesso");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = editarCliente;
