const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")

const REGION = "us-east-1"
const ddbClient = new DynamoDBClient({ region: REGION });
module.exports = { ddbClient };