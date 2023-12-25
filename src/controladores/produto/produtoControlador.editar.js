const knex = require("../../bancodedados/conexao");
const { s3, uploadDeArquivo } = require("../../servicos/s3");

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  const { file } = req;

  try {
    const existe_id = await knex("produtos").where("id", "=", id).first("id");

    const existe_categoria_id = await knex("categorias")
      .where("id", "=", categoria_id)
      .first("id");

    if (!existe_id) {
      return res.status(401).json("Campo id inválido.");
    }

    if (!existe_categoria_id) {
      return res.status(401).json("Campo categoria_id inválido.");
    }

    await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (file) {
      await s3
        .deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: `${id}/`,
        })
        .promise();

      const arquivoUpado = await uploadDeArquivo(
        s3,
        process.env.BUCKET_NAME,
        `${id}/${file.originalname}`,
        file.buffer,
        file.mimetype
      );

      await knex("produtos")
        .where("id", "=", id)
        .update({ produto_imagem: arquivoUpado.Location });
    }

    return res.status(200).json("Produto atualizado/editado com sucesso");
  } catch (error) {
    return res
      .status(401)
      .json("Esse produto não pode ser editado/atualizado.");
  }
};

module.exports = editarProduto;
