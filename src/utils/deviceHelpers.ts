import { gatewaysCollection } from "../db/connect";

export function deviceStatus(status) {
  return status ? status : "online";
}
export function deviceDateCreated(dateCreated) {
  return dateCreated ? new Date(dateCreated) : new Date();
}

export function newDeviceCreation(
  uid: number,
  vendor: string,
  dateCreated: Date,
  status: string
) {
  return {
    vendor,
    dateCreated: deviceDateCreated(dateCreated),
    status: deviceStatus(status),
    uid,
  };
}

export async  function getMaxDeviceId():Promise<number>{
  const devices = await gatewaysCollection.aggregate(
    [
      { $unwind: "$peripheralDevices" },
      { $group: { _id: null, maxUid: { $max: "$peripheralDevices.uid" } } },
      { $project: { _id: 0, maxUid: 1 } },
    ]
  ).toArray()
  const highestUid = devices.length>0?devices[0].maxUid:0;
  return highestUid;
}