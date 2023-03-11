import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { peripheralDevice } from "../requestSchema/gateway";

export async function deletePeripheral(req: Request, res: Response) {
  const { id, uid } = req.params;
  const filter = {
    _id: new ObjectId(id),
  };

  const updateGateway = { $pull: { peripheralDevices: { uid: Number(uid) } } };
  const result = await gatewaysCollection.updateOne(filter, updateGateway);
  if (result.modifiedCount === 0) {
    return res.sendStatus(404);
  } else {
    return res.sendStatus(204);
  }
}
