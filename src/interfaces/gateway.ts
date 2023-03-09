import { ObjectId } from "mongodb";

export interface PeripheralDevice {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: "online" | "offline";
}

export interface Gateway {
  _id: ObjectId;
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices: PeripheralDevice[];
}
