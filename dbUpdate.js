const {
  DynamoDBDocumentClient,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb')
const { ddbClient } = require('./libs/ddbClient')
const { translateConfig } = require('./config/dynamoConfigs')

const TABLE_NAME = 'wodays'

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig)

const updateDateEpoch = async (id, epoch) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: `${id}` },
    UpdateExpression: 'set date_epoch = :s',
    ExpressionAttributeValues: { ':s': epoch },
  }
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params))
    console.log('Success - item added or updated', data)
  } catch (err) {
    console.log('Error', err)
  }
}


module.exports = {
  updateDateEpoch
}
