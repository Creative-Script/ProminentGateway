# ProminentGateway

[![Coverage Status](https://coveralls.io/repos/github/Creative-Script/ProminentGateway/badge.svg?branch=dev)](https://coveralls.io/github/Creative-Script/ProminentGateway) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/Creative-Script/ProminentGateway/tree/dev.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Creative-Script/ProminentGateway)
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

```
CONNECTION_STRING can be configured to your local database server,
COLLECTION_NAME will be the prod collection.
TEST_COLLECTION_NAME can be created and will be run during tests
```
NB: the `TEST_COLLECTION_NAME` collection will be emptied after all tests are run.

3. Run the application

To run the app while adding changes
`npm run serve`

Access the documentation for all routes in a browser of your choice

`http://localhost:3000/api-docs/`

5. Deploy the application

`npm run build`

6. To test the application

`npm run test`