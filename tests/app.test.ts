import "./base-test";
import { app, startServer, stopServer } from "../src/app";
import request from "supertest";
import { emptyDatabase } from "../src/db/connect";

describe("API endpoint", () => {
  beforeAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
    await startServer();
    // start the server and store a reference to the server object
  });
  afterAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
    await emptyDatabase();
    await stopServer();
    // start the server and store a reference to the server object
  });

  it("should return a 200 status code and a JSON object", async () => {
    const res = await request(app).get("/gateways");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual([]);
  });
});
