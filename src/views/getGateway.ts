import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
export async function getGateway(req: Request, res: Response) {
  const { id } = req.params;
  const gateway = await gatewaysCollection.findOne({ _id: new ObjectId(id) });
  if (!gateway) {
    return res.sendStatus(404);
  } else {
    return res.status(200).json(gateway);
  }
}
