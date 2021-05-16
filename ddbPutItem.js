// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
const item22 = require("./item")

// Set the AWS Region
const REGION = "us-east-1"
const TABLE_NAME = "wodays"

// Set the parameters
const params = {
  TableName: TABLE_NAME,
  Item: item22
};

// Create DynamoDB service object
const dbclient = new DynamoDBClient({ region: REGION });

const run = async () => {
  try {
    const data = await dbclient.send(new PutItemCommand(params));
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
run();