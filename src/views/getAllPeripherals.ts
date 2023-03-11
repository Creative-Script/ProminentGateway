import { gatewaysCollection } from "../db/connect";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

export async function getAllPeripherals(req: Request, res: Response) {
  const { id } = req.params;
  const filter = { _id: new ObjectId(id) };
  const projection = {
    peripheralDevices: 1,
    serialNumber: 1,
  };
  const { peripheralDevices } = await gatewaysCollection.findOne(filter, {
    projection,
  });
  res.send(peripheralDevices);
}
