const knex = require("../../bancodedados/conexao");

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes").select("*");

    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = listarClientes;
