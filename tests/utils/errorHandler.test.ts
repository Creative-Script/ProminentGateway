import { Request, Response, NextFunction } from "express";
import errorHandler from "../../src/utils/errorHandler";
describe("test error handler", () => {
  it("should be able to return message to user when error occurs", async () => {
    const req: Request = { body: {} } as Request;
    const res: Response = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const next: NextFunction = jest.fn();
    const error: Error = {
      stack: "test that an error occured and is logged",
    } as Error;
    errorHandler(error, req, res, next);
    expect(res.send).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
  });
});
