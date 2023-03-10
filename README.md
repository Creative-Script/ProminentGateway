# ProminentGateway

Gateway management portal

### Set up

The set up will require you to  use the  terminal or power shell.

1. Install dependencies

`npm install `

2. Add a .env file

CONNECTION_STRING can be configured to your local database server,
COLLECTION_NAME will be the prod collection.
TEST_CONNECTION_NAME can be created and will be run during tests

]

3. Run the application

To run the app while adding changes
`npm run serve`

Access the documentation for all routes in a browser of your choice

`http://localhost:3000/api-docs/`

5. Deploy the application

`npm run build`

6. To test the application

`npm run test`