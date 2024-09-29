const AWS = require('aws-sdk'); // Import the AWS SDK to interact with AWS services

// Create a DynamoDB DocumentClient instance
const db = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION, // Set the AWS region from environment variables
});

// Export the db object so it can be used in other parts of the application
module.exports = { db };