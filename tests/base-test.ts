jest.mock("../src/db/constants", () => ({
  GATEWAYS_COLLECTION_NAME: process.env["TEST_COLLECTION_NAME"],
  MONGO_URI: process.env["CONNECTION_STRING"],
}));
