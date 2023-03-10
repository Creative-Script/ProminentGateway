import { app, startServer, stopServer } from "../src/app";
import request from "supertest";

jest.mock("../src/db/constants", () => ({
  GATEWAYS_COLLECTION_NAME: process.env["TEST_COLLECTION_NAME"],
  MONGO_URI: process.env['CONNECTION_STRING']
}));
describe("API endpoint", () => {
  beforeAll(async () => {
    global["GATEWAYS_COLLECTION_NAME"] = process.env["TEST_COLLECTION_NAME"];
    // perform any setup required before starting the server
    // e.g. connect to the database
    await startServer();
    // start the server and store a reference to the server object
  });
  afterAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
    await stopServer();
    // start the server and store a reference to the server object
  });

  it("should return a 200 status code and a JSON object", async () => {
    const res = await request(app).get("/gateways");
    console.log(res.statusCode)
    console.log(res.body)
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual([]);
  });
});
