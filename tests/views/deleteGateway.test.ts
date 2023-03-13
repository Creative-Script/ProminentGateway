import "../base-test";
import { Collection, MongoClient } from "mongodb";
import { Request, Response } from "express";
import {
  testGateway,
} from "../data/testGateway";
import { connectToDatabase } from "../../src/db/connect";

import {mockConnect} from "../base-mock-db";
import { deleteGateway } from "../../src/views/deleteGateway";

describe("test delete gateway", () => {
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
    await deleteGateway(req, res);
    expect(res.status).toHaveBeenCalledWith(500);

  });

});
