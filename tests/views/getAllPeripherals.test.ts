import "../base-test";
import { MongoClient, } from "mongodb";
import { Request, Response } from "express";

import { connectToDatabase } from "../../src/db/connect";

import { mockConnect } from "../base-mock-db";;
import { getAllPeripherals } from "../../src/views/getAllPeripherals";

describe("test get all  Peripheral", () => {
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
    await getAllPeripherals(req,res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
});
