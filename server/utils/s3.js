require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = 'footybase-images'
const region = 'us-east-1'
const accessKeyId = 'AKIATO336OPPNSI4I2PY'
const secretAccessKey = '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'

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream