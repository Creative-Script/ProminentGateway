import "../base-test";
import { MongoClient, } from "mongodb";
import { Request, Response } from "express";

import { connectToDatabase } from "../../src/db/connect";

import { mockConnect } from "../base-mock-db";
import { getGateway } from "../../src/views/getGateway";
import { testGateway } from "../data/testGateway";

describe("test gateway", () => {
  beforeAll(async () => {
    
    jest.spyOn(MongoClient, "connect").mockImplementationOnce(mockConnect);
    await connectToDatabase();
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
    const req: Request = {} as Request;
    await getGateway(req,res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
  it("should return a 404 when gateway does not exist occurs", async () => {
    const req = {
        params:{
            id:testGateway._id
        },get:{},header:{},accepts:{}
    }as unknown as  Request;
    await getGateway(req,res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
});
