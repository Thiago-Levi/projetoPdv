const knex = require("../../bancodedados/conexao");
const { s3, listarArquivosDeUmBucket } = require("../../servicos/s3");

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const existeProdutoVinculadoAAlgumPedido = await knex("pedido_produtos")
      .where("produto_id", "=", id)
      .select("*");

    if (existeProdutoVinculadoAAlgumPedido.length != 0) {
      return res
        .status(404)
        .json(
          "Este produto está vinculado a pedidos, por tanto, não pode ser excluído."
        );
    }

    const produto = await knex("produtos").del().where({ id }).returning();

    if (!produto) {
      return res.status(404).json("id do produto inválido");
    }

    await s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: `${id}/`,
      })
      .promise();

    const arquivos = await listarArquivosDeUmBucket(
      s3,
      process.env.BUCKET_NAME
    );

    return res.status(200).json("Produto Excluído");
  } catch (error) {
    console.log(error);
    return res.status(404).json("id do produto inválido");
  }
};

module.exports = deletarProduto;
