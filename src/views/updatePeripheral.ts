import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { peripheralDevice } from "../requestSchema/gateway";
import { deviceDateCreated, deviceStatus } from "../utils/deviceHelpers";

export async function updatePeripheral(req: Request, res: Response) {
  try {
    const { id, uid } = req.params;
    const { vendor, status, dateCreated } = req.body;
    const filter = {
      _id: new ObjectId(id),
    };
    const docId = Number(uid);
    const filterExists = {
      ...filter,
      peripheralDevices: {
        $elemMatch:{
          uid: { $ne: docId },
          vendor, status 
        }
      },
    };
    const otherExisting = await gatewaysCollection.findOne(filterExists);
    if (otherExisting) {
      return res.status(400).json({
        message: "there is an existing device with the same vendor and status",
      });
    }
    const udpateFilter = {
      ...filter,
      "peripheralDevices.uid": docId,
    };
    const updateGateway = {
      $set: {
        "peripheralDevices.$.vendor": vendor,
        "peripheralDevices.$.status": deviceStatus(status),
        "peripheralDevices.$.dateCreated": deviceDateCreated(dateCreated),
      },
    };
    const result = await gatewaysCollection.updateOne(
      udpateFilter,
      updateGateway
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "no new update" });
    } else {
      return res.status(204).json({ message: "updated" });
    }
  } catch (error) {
    //console.log("error occured");
    //console.log(error);
    return res.status(500).json({ message: "Internal Server Error",error:error.message });
  }
}
