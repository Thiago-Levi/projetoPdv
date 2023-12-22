const knex = require("../../bancodedados/conexao");
const {
  s3,
  uploadDeArquivo,
  listarArquivosDeUmBucket,
} = require("../../servicos/s3");

// const arquivo = await s3
//   .upload({
//     Bucket: process.env.BUCKET_NAME,
//     Key: file.originalname,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   })
//   .promise();

// const arquivos = await s3
// .listObjectsV2({
// Bucket: process.env.BUCKET_NAME,
// })
// .promise();

const cadatrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;
  try {
    const existeCategoria_id = await knex("categorias")
      .where("id", "=", categoria_id)
      .first("id");

    if (!existeCategoria_id) {
      return res.status(404).json("Campo categoria_id inválido.");
    }

    const produtoCadastrado = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("id");

    if (file) {
      const arquivoUpado = await uploadDeArquivo(
        s3,
        process.env.BUCKET_NAME,
        `${produtoCadastrado[0].id}/${file.originalname}`,
        file.buffer,
        file.mimetype
      );

      await knex("produtos")
        .where("id", "=", produtoCadastrado[0].id)
        .update({ produto_imagem: arquivoUpado.Location });
    }

    const arquivos = await listarArquivosDeUmBucket(
      s3,
      process.env.BUCKET_NAME
    );

    const produto = await knex("produtos")
      .where("id", "=", produtoCadastrado[0].id)
      .first();
    console.log(arquivos.Contents);
    return res.status(200).json(produto);
  } catch (error) {
    console.log(error);
    return res.status(401).json("Esse produto não pode ser cadastrado.");
  }
};

module.exports = cadatrarProduto;
