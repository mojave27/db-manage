const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = "us-east-1";
const TABLE_NAME = "wodays"

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the clients.
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

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

const run = async () => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
