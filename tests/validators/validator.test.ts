import { NextFunction, Request, Response } from "express";
import { validateGateway, validatePeripheralDevice } from "../../src/requestSchema/validator";
import { newTestGateway, testGateway } from "../data/testGateway";

describe('test the request validators',()=>{
    const res:Response = {
        send:jest.fn().mockReturnThis(),
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
    } as unknown as Response;
    const next:NextFunction =jest.fn();
    it('should be able to continue a request if no validation error occurs',async ()=>{
        const req:Request = {
            body:newTestGateway
        } as Request;
        validateGateway(req,res,next)
        expect(next).toHaveBeenCalled();
    })
    it('should return an error when there is invalid gateway data sent',async ()=>{
        const req:Request = {
            body:testGateway
        } as Request;
        validateGateway(req,res,next)
        expect(next).toHaveBeenCalled();
    })
    it('should return an error when there is invalid peripheral data sent',async ()=>{
        const req:Request = {
            body:testGateway
        } as Request;
        validatePeripheralDevice(req,res,next)
        expect(next).toHaveBeenCalled();
    })
});