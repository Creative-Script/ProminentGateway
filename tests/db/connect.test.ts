import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../src/db/connect";
describe("db connection", () => {
  it("should log and not throw an exception when database connection fails", async () => {
    const mockConnect = jest.fn((uri, a)=>{
        throw new Error('no connection')
    });
    const mockLog = jest.fn();
    jest.spyOn(MongoClient, 'connect').mockImplementationOnce(mockConnect);
    jest.spyOn(console, 'log').mockImplementationOnce(mockLog);
    await connectToDatabase();
    await expect(mockConnect).toHaveBeenCalled();
    await expect(mockLog).toHaveBeenCalled();
  });
});
