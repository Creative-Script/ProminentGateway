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
