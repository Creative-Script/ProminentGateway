import { gatewaysCollection } from "../db/connect";
import { Request, Response } from "express";

export async function getAllGateways(req: Request, res: Response) {
  try {
    const gateways = await gatewaysCollection.find().toArray();
    res.send(gateways);
  } catch (error) {
    //console.log("error occured");
    //console.log(error);
    return res.status(500).json({ message: "Internal Server Error" , error:error.message});
  }
}
