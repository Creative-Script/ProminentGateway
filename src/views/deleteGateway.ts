import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
export async function deleteGateway(req: Request, res: Response) {
  const { id } = req.params;
  const result = await gatewaysCollection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    return res.sendStatus(404);
  } else {
    return res.sendStatus(204);
  }
}
