# install sdk
https://github.com/aws/aws-sdk-js-v3

```bash
$ mkdir db-manage
$ cd db-manage
$ npm init
  ...
$ npm i @aws-sdk/client-dynamodb
$ touch index.js
```

## index.js starter
```javascript
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

(async () => {
  const client = new DynamoDBClient({ region: "us-west-2" });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();
```

```bash
$ node index.js
exercises
programs
wodays
workouts
```

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-examples.html