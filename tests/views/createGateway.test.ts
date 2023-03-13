import "../base-test";
import { createGateway, getNextGWId } from "../../src/views/createGateway";
import { Collection, MongoClient, FindCursor, Db } from "mongodb";
import { Request, Response } from "express";
import {
  newTestGateway,
  newTestGatewayWtihPeripherals,
  testGateway,
  testPeripheral,
} from "../data/testGateway";

import { Gateway } from "../../src/interfaces/gateway";
import { connectToDatabase } from "../../src/db/connect";

import {mockConnect} from "../base-mock-db";

describe("test gateway", () => {
  beforeAll(async () => {
    await connectToDatabase();
    jest.spyOn(MongoClient, "connect").mockImplementationOnce(mockConnect);
    
  });
  const res: Response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  //   const mockConnect = jest.fn((uri, a) => {
  //     return mockGateway;
  //   });
  it("should return a 500 when an error occurs", async () => {
    const req: Request = {
      body: testPeripheral,
    } as Request;

    // const mockFind = jest.fn().mockResolvedValue(Error('raise'));
    jest.spyOn(Collection.prototype, "find").mockImplementationOnce(
      () =>{throw Error('raise')}
    );
    await createGateway(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.status).toHaveBeenCalledWith(500);

  });
  it("should return error when trying to add existing gateway", async () => {
    const req: Request = {
      body: newTestGateway,
    } as Request;
    const mockFind = jest.fn().mockResolvedValue([testGateway]);
    jest.spyOn(Collection.prototype, "find").mockImplementationOnce(
      () =>
        ({
          toArray: mockFind,
        } as unknown as FindCursor<Gateway>)
    );
    const data = await createGateway(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Gateway already exists with same ipv4address or serial number",
    });
  });
  it("should add gateway with peripherals", async () => {
    const req: Request = {
      body: newTestGatewayWtihPeripherals,
    } as Request;
    const mockFind = jest.fn().mockResolvedValue([]);
    jest.spyOn(Collection.prototype, "find").mockImplementationOnce(
      () =>
        ({
          toArray: mockFind,
        } as unknown as FindCursor<Gateway>)
    );
    const mockFindOne = jest.fn().mockResolvedValue(null);
    jest.spyOn(Collection.prototype, "findOne").mockImplementationOnce(
      async () =>
        ({
          toArray: mockFindOne,
        } as unknown as FindCursor<Gateway>)
    );
    const data = await createGateway(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should catch return right name even if invalid is provided", async () => {
    const newName = getNextGWId("twins");
    const correctName = `GW${(1).toString().padStart(8, "0")}`;
    expect(newName).toEqual(correctName);
  });
  it("should catch return right name even if valid name is provided", async () => {
    const newName = getNextGWId("GW00000002");
    const correctName = `GW${(3).toString().padStart(8, "0")}`;
    expect(newName).toEqual(correctName);
  });
});
