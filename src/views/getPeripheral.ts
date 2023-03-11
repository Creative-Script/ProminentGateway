import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";

export async function getPeripheral(req: Request, res: Response) {
  const { id, uid} = req.params;
  const filter = {
    _id: new ObjectId(id),
    peripheralDevices: {
      $elemMatch: { uid: Number(uid) },
    },
  };
  const projection = {
    "peripheralDevices.$": 1 
  }

  const gateway = await gatewaysCollection.findOne(filter,{projection},);
  if (!gateway || !gateway.peripheralDevices) {
    return res.sendStatus(404);
  } else {
    return res.status(200).json(gateway.peripheralDevices);
  }
}
