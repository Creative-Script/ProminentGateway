# ProminentGateway

[![Coverage Status](https://coveralls.io/repos/github/Creative-Script/ProminentGateway/badge.svg?branch=main)](https://coveralls.io/github/Creative-Script/ProminentGateway?branch=main) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/Creative-Script/ProminentGateway/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Creative-Script/ProminentGateway/tree/main)

Gateway management portal

### Technologies

- Node.js
- Express
- MongoDb

### Set up

The set up will require you to  use the  terminal or power shell.

1. Install dependencies

`npm install `

2. Add a .env file

**CONNECTION_STRING**  `<your_local_mongodb_database_server>`
**COLLECTION_NAME** `<your_prod_mongo_collection>`
**TEST_COLLECTION_NAME**`<your_test_mongo_collection>`

NB: the `TEST_COLLECTION_NAME` collection will be emptied during automated tests.

3. Run the application

To run the app while adding changes
`npm run dev`

Access the documentation for all routes in a browser of your choice

`http://localhost:3000/api-docs/`

5. Deploy the application

`npm run build`

6. To test the application

`npm run test`