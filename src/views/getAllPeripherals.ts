import { gatewaysCollection } from "../db/connect";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

export async function getAllPeripherals(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const projection = {
      peripheralDevices: 1,
      serialNumber: 1,
    };
    const { peripheralDevices } = await gatewaysCollection.findOne(filter, {
      projection,
    });
    return res.send(peripheralDevices);
  } catch (error) {
    //console.log("error occured");
    //console.log(error);
    return res.status(500).json({ message: "Internal Server Error",error:error.message });
  }
}
