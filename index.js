const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "us-east-1"
// const TABLE_NAME = "wodays"

const listTables = async () => {
  const client = new DynamoDBClient({ region: REGION });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
}

listTables()