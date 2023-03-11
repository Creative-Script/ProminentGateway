import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { gatewaysCollection } from "../db/connect";
import { Gateway, PeripheralDevice } from "../interfaces/gateway";
import { getMaxDeviceId, newDeviceCreation } from "../utils/deviceHelpers";

export async function addPeripheralDevice(req: Request, res: Response) {
  const { id } = req.params;
  const { vendor, dateCreated, status } = req.body;
  const filter = { _id: new ObjectId(id) };
  const projection = {
    peripheralDevices: 1,
    serialNumber: 1,
  };
  const gateway = await gatewaysCollection.findOne(filter, { projection });

  if (!gateway) {
    return res.status(404).json({ message: "Gateway not found" });
  }

  if (gateway.peripheralDevices && gateway.peripheralDevices.length >= 10) {
    return res
      .status(400)
      .json({ message: "Maximum number of peripheral devices reached" });
  } else if (
    gateway.peripheralDevices &&
    gateway.peripheralDevices.filter(
      (device) => device.vendor === vendor && device.status === status
    ).length > 0
  ) {
    return res.status(400).json({ message: "Device already exists" });
  }
  const newDevice = await createDevice(gateway, vendor, dateCreated, status);

  const updates = {
    $push: { peripheralDevices: newDevice },
  };
  await gatewaysCollection.updateOne(filter, updates);
  return res.send(newDevice);
}

async function createDevice(
  gateway: Gateway,
  vendor: string,
  dateCreated: Date,
  status: string
): Promise<PeripheralDevice> {
  
  const highestUid = await getMaxDeviceId();
  const newUid = highestUid + 1;

  return newDeviceCreation(newUid, vendor, dateCreated, status);
}
