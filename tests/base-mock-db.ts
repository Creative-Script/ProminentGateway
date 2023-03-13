import { Gateway } from "../src/interfaces/gateway";
import { MongoClient, Collection, Db } from "mongodb";

export const mockGatewayCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn().mockResolvedValueOnce([{ id: "1", name: "Gateway 1" }]),
  aggregate:jest.fn().mockReturnThis(),
} as unknown as Collection<Gateway>;
export const mockDb: Db = {
  collection: jest.fn().mockResolvedValue(mockGatewayCollection),
} as unknown as Db;
export const mockConnect = jest.fn(async (uri, a) => {
  return { 
    db: jest.fn((...args)=>{
        return mockDb;
    }) } as unknown as MongoClient;
});
