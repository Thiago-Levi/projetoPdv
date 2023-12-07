const knex = require("../../bancodedados/conexao");

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await knex("clientes").where({ id }).first();

    if (!cliente) {
      return res.status(404).json("id inexistente.");
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = detalharCliente;
