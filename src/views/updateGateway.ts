import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { UpdateGateway } from "../interfaces/gateway";

export async function updateGateway(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { serialNumber, ipv4Address } = req.body;
    const gateway: UpdateGateway = {
      serialNumber,
      ipv4Address,
    };
    const docId = new ObjectId(id);
    const otherExisting = await gatewaysCollection.findOne({
      _id: { $ne: docId },
      $or: [gateway],
    });
    if (otherExisting) {
      return res.status(400).json({ message: "already exists" });
    }
    const result = await gatewaysCollection.updateOne(
      { _id: docId },
      { $set: gateway }
    );
    if (result.modifiedCount === 0) {
      return res.sendStatus(404);
    } else {
      return res.send(gateway);
    }
  } catch (error) {
    //console.log("error occured");
    //console.log(error);
    return res.status(500).json({ message: "Internal Server Error",error:error.message });
  }
}
