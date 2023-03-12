import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { Gateway, PeripheralDevice } from "../interfaces/gateway";
import { Request, Response } from "express";
import {
  getMaxDeviceId,
  newDeviceCreation,
} from "../utils/deviceHelpers";

export async function createGateway(req: Request, res: Response) {
  try {
    const { serialNumber, ipv4Address, peripheralDevices } = req.body;

    const query = {
      $or: [{ serialNumber }, { ipv4Address }],
    };
    const existing = await gatewaysCollection.find(query).toArray();
    if (existing.length) {
      return res.status(400).json({
        message:
          "Gateway already exists with same ipv4address or serial number",
      });
    }
    const gateway: Gateway = {
      _id: new ObjectId(),
      serialNumber,
      name: await getNextName(),
      ipv4Address,
      peripheralDevices: await updatePeripherals(peripheralDevices),
    };

    await gatewaysCollection.insertOne(gateway);

    return res.send(gateway);
  } catch (error) {
    console.log("error occured");
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function updatePeripherals(peripheralDevices: PeripheralDevice[]) {
  if (peripheralDevices && peripheralDevices.length > 0) {
    return assignUids(peripheralDevices);
  } else {
    return [];
  }
}
async function assignUids(
  peripherals: PeripheralDevice[]
): Promise<PeripheralDevice[]> {
  const newPeripherals: PeripheralDevice[] = [];
  let index = (await getMaxDeviceId()) + 1;
  peripherals.map(({ vendor, dateCreated, status }) => {
    if (newPeripherals.filter((item) => item.vendor === vendor).length === 0) {
      newPeripherals.push(
        newDeviceCreation(index++, vendor, dateCreated, status)
      );
    }
  });
  return newPeripherals;
}

async function getNextName(): Promise<string> {
  const latestGateWay = await gatewaysCollection.findOne(
    {},
    { sort: { name: -1 } }
  );
  if (latestGateWay) {
    return getNextGWId(latestGateWay.name);
  } else {
    return `GW${(1).toString().padStart(8, "0")}`;
  }
}
function getNextGWId(currentId: string): string {
  try {
    const matches = currentId.match(/\d+$/);
    if (!matches) {
      throw new Error("Invalid GW ID format");
    }
    const num = parseInt(matches[0], 10) + 1;
    const paddedNum = num.toString().padStart(8, "0");
    return `GW${paddedNum}`;
  } catch (error) {
    return `GW${(1).toString().padStart(8, "0")}`;
  }
}
