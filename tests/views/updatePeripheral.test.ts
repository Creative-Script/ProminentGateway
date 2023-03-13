import "../base-test";
import { MongoClient, } from "mongodb";
import { Request, Response } from "express";

import { connectToDatabase } from "../../src/db/connect";

import { mockConnect } from "../base-mock-db";;
import { updatePeripheral } from "../../src/views/updatePeripheral";

describe("test update  Peripheral", () => {
  beforeAll(async () => {
    
    jest.spyOn(MongoClient, "connect").mockImplementationOnce(mockConnect);
    await connectToDatabase();
  });
  
  const res: Response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  it("should return a 500 when an error occurs", async () => {
    const req = {
    }as unknown as  Request;
    await updatePeripheral(req,res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
});
