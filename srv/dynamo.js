const AWS = require('aws-sdk')
require('dotenv').config()


AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const S3 = new AWS.S3
module.exports = { dynamoClient,S3 }