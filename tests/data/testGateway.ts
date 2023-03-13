export const testGateway = {
  _id: "640cbacff093be15c44dc7b5",
  serialNumber: "string",
  name: "GW00000001",
  ipv4Address: "192.212.1.4",
  peripheralDevices: [],
};
export const newTestGateway = {
  serialNumber: "string",
  ipv4Address: "192.212.1.4",
  peripheralDevices: [],
};
export const updateTestGateway = {
    serialNumber: "string1",
    ipv4Address: "192.212.1.28",
    peripheralDevices: [],
  };
export const newTestGatewayWtihPeripherals = {
  serialNumber: "string",
  ipv4Address: "192.212.1.2",
  peripheralDevices: [
    {
      vendor: "stlr79ing",
      dateCreated: "2023-03-11 21:02:44.394",
      status: "offline",
    },
    {
      vendor: "stlr79ing",
      dateCreated: "2023-03-11 21:02:44.394",
      status: "offline",
    },
  ],
};

export const testPeripheral = {
  vendor: "stlr79iskng",
  dateCreated: "2023-03-11 21:02:44.394",
  status: "offline",
}
export const testPeripheralNoDate = {
  vendor: "stlr79iskng",
  status:'online'
}
