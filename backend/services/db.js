const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

module.exports = { db };