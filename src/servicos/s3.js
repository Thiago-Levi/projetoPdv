const aws = require("aws-sdk");
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadDeArquivo = async (
  s3,
  bucketName,
  fileOriginalName,
  fileBuffer,
  fileMimetype
) => {
  return await s3
    .upload({
      Bucket: bucketName,
      Key: fileOriginalName,
      Body: fileBuffer,
      ContentType: fileMimetype,
    })
    .promise();
};

const listarArquivosDeUmBucket = async (s3, nomeDoBucket) => {
  return await s3
    .listObjectsV2({
      Bucket: process.env.BUCKET_NAME,
    })
    .promise();
};

module.exports = { s3, uploadDeArquivo, listarArquivosDeUmBucket };
