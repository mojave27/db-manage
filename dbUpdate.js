const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require('./libs/ddbClient')
const { translateConfig } = require('./config/dynamoConfigs')

const TABLE_NAME = "wodays"

// Create the client
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

// Set the parameters
const params = {
  TableName: TABLE_NAME,
  /*
  Convert the attribute JavaScript object you are updating to the required
  Amazon  DynamoDB record. The format of values specifies the datatype. The
  following list demonstrates different datatype formatting requirements:
  String: "String",
  NumAttribute: 1,
  BoolAttribute: true,
  ListAttribute: [1, "two", false],
  MapAttribute: { foo: "bar" },
  NullAttribute: null
   */
  Key: {
    'id': '22', // For example, 'Season': 2.
  },
  // Define expressions for the new or updated attributes
  UpdateExpression: "set energy = :n, date_epoch = :s", // For example, "'set Title = :t, Subtitle = :s'"
  ExpressionAttributeValues: {
    ":n": "5", // For example ':t' : 'NEW_TITLE'
    ":s": "12345"
  },
};

const update = async () => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = {
  update
}
