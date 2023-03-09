import { Request,Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { Gateway } from "../interfaces/gateway";

export async function updateGateway(req: Request, res: Response) {
  const { id } = req.params;
  const { serialNumber, name, ipv4Address, peripheralDevices } = req.body;
  const gateway: Gateway = {
    _id: new ObjectId(id),
    serialNumber,
    name,
    ipv4Address,
    peripheralDevices,
  };
  const result = await gatewaysCollection.updateOne(
    { _id: gateway._id },
    { $set: gateway }
  );
  if (result.modifiedCount === 0) {
    res.sendStatus(404);
  } else {
    res.send(gateway);
  }
}
