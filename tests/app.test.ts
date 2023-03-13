import "./base-test";
import { app, startServer, stopServer } from "../src/app";
import request from "supertest";
import { emptyDatabase } from "../src/db/connect";
import { newTestGateway, newTestGatewayWtihPeripherals, testPeripheral, testPeripheralNoDate, updateTestGateway } from "./data/testGateway";
// import { newTestGateway, updateTestGateway } from "./data/testGateway";

describe("Test API endpoints and basic functionality", () => {
  let gatewayId;
  let peripheralId;
  beforeAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
    await startServer();
    await emptyDatabase();
    // start the server and store a reference to the server object
  });

  afterAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
    await stopServer();
    // start the server and store a reference to the server object
  });

  it("should be able to access health check or home page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.api).toEqual("prominent gateways api");
  });

  it("should be able to view available gateways", async () => {
    const res = await request(app).get("/gateways");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual([]);
  });
  
  it("should be able to create a gateway", async () => {
    const res = await request(app).post("/gateways").send(newTestGateway);
    expect(res.statusCode).toEqual(200);
    gatewayId = res.body._id;
    expect(res.type).toEqual("application/json");
    expect(res.body.ipv4Address).toEqual(newTestGateway.ipv4Address);
  });

  it("should be able to view the created gateway in list of gateways", async () => {
    const res = await request(app).get("/gateways");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body[0].ipv4Address).toEqual(newTestGateway.ipv4Address);
  });
  it("should be able to view the created gateway by id", async () => {
    const res = await request(app).get(`/gateways/${gatewayId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.ipv4Address).toEqual(newTestGateway.ipv4Address);
  });

  it("should be able to update the created gateway", async () => {
    const res = await request(app)
      .put(`/gateways/${gatewayId}`)
      .send(updateTestGateway);
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.ipv4Address).toEqual(updateTestGateway.ipv4Address);
  });
  it("should not able to update the invalid gateway id", async () => {
    const res = await request(app)
      .put(`/gateways/test`)
      .send(updateTestGateway);
    expect(res.statusCode).toEqual(500);
  });
  it("should not able to update gateway with info of an existing gateway", async () => {
    const res = await request(app)
      .put(`/gateways/test12323332`)
      .send(updateTestGateway);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("already exists");
  });
  it("should be able to add peripheral to gateway", async () => {
    
    const res = await request(app).post(
      `/gateways/${gatewayId}/peripheralDevices`
      ).send(newTestGatewayWtihPeripherals.peripheralDevices[0]);
    peripheralId = res.body.uid;
    expect(res.statusCode).toEqual(200);
  });
  it("should be able to add peripheral to gateway without date or status", async () => {
    
    const res = await request(app).post(
      `/gateways/${gatewayId}/peripheralDevices`
      ).send(testPeripheralNoDate);

    expect(res.statusCode).toEqual(200);
  });
  
  it("should be able to retrieve peripherals from gateway", async () => {
    
    const res = await request(app).get(
      `/gateways/${gatewayId}/peripheralDevices`
      );
    expect(res.statusCode).toEqual(200);
  });
  it("should be able to retrieve a peripheral from gateway", async () => {
    
    const res = await request(app).get(
      `/gateways/${gatewayId}/peripheralDevices/${peripheralId}`
      );
    expect(res.statusCode).toEqual(200);
  });
  it("should be able to update a peripheral from gateway", async () => {
    
    const res = await request(app).put(
      `/gateways/${gatewayId}/peripheralDevices/${peripheralId}`
      ).send(testPeripheral);
    expect(res.statusCode).toEqual(204);
  });
  it("should not be able to update a peripheral with info of existing peripheral in gateway", async () => {
    
    const res = await request(app).put(
      `/gateways/${gatewayId}/peripheralDevices/${peripheralId}`
      ).send(testPeripheralNoDate);
    expect(res.statusCode).toEqual(400);
  });
  it("should not be able to update a peripheral if no new changes are sent", async () => {
    
    const res = await request(app).put(
      `/gateways/${gatewayId}/peripheralDevices/${peripheralId}`
      ).send(testPeripheral);
    expect(res.statusCode).toEqual(404);
  });
  
  it("should be able to delete peripheral from existing gateway", async () => {
    const res = await request(app).delete(`/gateways/${gatewayId}/peripheralDevices/${peripheralId}`);
    expect(res.statusCode).toEqual(204);
  });
  it("should not be able to retrieve a non existent peripheral from gateway", async () => {
    
    const res = await request(app).get(
      `/gateways/${gatewayId}/peripheralDevices/${peripheralId}`
      );
    expect(res.statusCode).toEqual(404);
  });

  it("should be able to delete the created gateway", async () => {
    const gateways = await request(app).get("/gateways");
    const docId = gateways.body[0]._id;
    const res = await request(app).delete(`/gateways/${docId}`);
    expect(res.statusCode).toEqual(204);
  });
  it("should not be able to delete nonexistent gateway", async () => {
    const res = await request(app).delete(`/gateways/test12323332`);
    expect(res.statusCode).toEqual(404);
  });
  it("should not be able to delete peripheral from nonexistent gateway", async () => {
    const res = await request(app).delete(`/gateways/test12323332/peripheralDevices/21`);
    expect(res.statusCode).toEqual(404);
  });
  it("should be able to add peripheral to non existent gateway", async () => {
    const res = await request(app).post(
      `/gateways/${gatewayId}/peripheralDevices`
      ).send(testPeripheralNoDate);
    expect(res.statusCode).toEqual(404);
  });

});
