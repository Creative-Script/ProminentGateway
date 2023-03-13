import "../base-test";
import { MongoClient, } from "mongodb";
import { Request, Response } from "express";

import { connectToDatabase } from "../../src/db/connect";

import { mockConnect } from "../base-mock-db";;
import { updateGateway } from "../../src/views/updateGateway";
import { newTestGateway, testGateway } from "../data/testGateway";

describe("test update  gateway", () => {
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
      params:{
        id:testGateway._id
      },
      body:newTestGateway
    }as unknown as  Request;
    await updateGateway(req,res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
});
