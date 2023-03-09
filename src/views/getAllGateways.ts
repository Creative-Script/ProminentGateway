import { gatewaysCollection } from "../db/connect";
import { Request, Response } from "express";

export async function getAllGateways(req: Request, res: Response) {
  const gateways = await gatewaysCollection.find().toArray();
  res.send(gateways);
}
