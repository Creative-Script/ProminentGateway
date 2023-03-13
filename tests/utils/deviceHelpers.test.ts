import "../base-test";
import "../base-mock-db"
import { connectToDatabase, } from "../../src/db/connect";
import {MongoClient, Collection, AggregationCursor} from 'mongodb';
import { mockConnect, mockGatewayCollection } from "../base-mock-db";

import { deviceStatus, getMaxDeviceId } from "../../src/utils/deviceHelpers";
import { Gateway } from "../../src/interfaces/gateway";

describe("deviceHelper in utils", () => {
  beforeAll(async () => {
    // perform any setup required before starting the server
    // e.g. connect to the database
//     jest.mock('../../src/db/connect',()=>({
//             gatewaysCollection:mockGatewayCollection
//   }))
    await connectToDatabase();
    jest.spyOn(MongoClient, "connect").mockImplementationOnce(mockConnect);
    
    // start the server and store a reference to the server object
  });

  it("should be able to get device status", async () => {
    const status = deviceStatus(null);
    expect(status).toEqual("online");
  });
  it("should be able to getmax device id when non is available", async () => {
    const mockFind = jest.fn().mockResolvedValue([]);
    jest.spyOn(Collection.prototype, "aggregate").mockImplementationOnce(
        () => ({
            toArray: mockFind,
          } as unknown as AggregationCursor<Gateway>)
      );
    const maxUid = await getMaxDeviceId();
    expect(maxUid).toEqual(0);
  });
});
