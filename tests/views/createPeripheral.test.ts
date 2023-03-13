import "../base-test";
import { Collection, MongoClient, FindCursor, Db } from "mongodb";
import { Request, Response } from "express";
import {

  testGateway,
  testPeripheral,
} from "../data/testGateway";

import { Gateway } from "../../src/interfaces/gateway";
import { connectToDatabase } from "../../src/db/connect";

import {mockConnect} from "../base-mock-db";
import { addPeripheralDevice } from "../../src/views/createPeripheral";

describe("test peripheral", () => {
  beforeAll(async () => {
    await connectToDatabase();
    jest.spyOn(MongoClient, "connect").mockImplementationOnce(mockConnect);
    
  });
  const res: Response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  it("should return a 500 when an error occurs", async () => {
    const req: Request = {
      body: testGateway,
    } as Request;

    jest.spyOn(Collection.prototype, "find").mockImplementationOnce(
      () =>{throw Error('raise')}
    );
    await addPeripheralDevice(req, res);
    expect(res.status).toHaveBeenCalledWith(500);

  });
  it("should return error when trying to add existing peripheral", async () => {
    const req: Request = {
      body: testPeripheral,
      params:{
        id:testGateway._id
      }
    } as unknown as Request;
    const mockFind = jest.fn().mockResolvedValue(testGateway);
    jest.spyOn(Collection.prototype, "find").mockImplementationOnce(
      () =>
        ({
          toArray: mockFind,
        } as unknown as FindCursor<Gateway>)
    );
    await addPeripheralDevice(req, res);
    expect(res.json).toHaveBeenCalled();
  });

});
