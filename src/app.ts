import express, { NextFunction, Request, Response } from "express";
import { client, connectToDatabase } from "./db/connect";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";

import { createGateway } from "./views/createGateway";
import { deleteGateway } from "./views/deleteGateway";
import { getAllGateways } from "./views/getAllGateways";
import { getGateway } from "./views/getGateway";
import { updateGateway } from "./views/updateGateway";
import {
  validateGateway,
  validatePeripheralDevice,
} from "./requestSchema/validator";
import { getAllPeripherals } from "./views/getAllPeripherals";
import { addPeripheralDevice } from "./views/createPeripheral";
import { deletePeripheral } from "./views/deletePeripheral";
import { updatePeripheral } from "./views/updatePeripheral";
import { getPeripheral } from "./views/getPeripheral";
import errorHandler from "./utils/errorHandler";

// start app
const app = express();
app.use(express.json());
// setup swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// setup error handler


client;
async function home(req: Request, res: Response) {
  res.status(200).json({ time: new Date(), api: "prominent gateways api" });
}
async function startServer() {
  await connectToDatabase();
  // register routes
  app.get("/", home);
  app.post("/gateways", validateGateway, createGateway);
  app.get("/gateways/:id", getGateway);
  app.put("/gateways/:id", validateGateway, updateGateway);
  app.delete("/gateways/:id", deleteGateway);
  app.get("/gateways", getAllGateways);
  app.get("/gateways/:id/peripheralDevices", getAllPeripherals);
  app.post(
    "/gateways/:id/peripheralDevices",
    validatePeripheralDevice,
    addPeripheralDevice
  );
  app.put(
    "/gateways/:id/peripheralDevices/:uid",
    validatePeripheralDevice,
    updatePeripheral
  );
  app.delete("/gateways/:id/peripheralDevices/:uid", deletePeripheral);
  app.get("/gateways/:id/peripheralDevices/:uid", getPeripheral);
  // expose port
  app.use(errorHandler);
  var listener = app.listen(3000, () => {
    console.log(`Server started on port ${listener.address()["port"]}`);
  });
}

async function stopServer() {
  await disconnectFromDatabase();
}
async function disconnectFromDatabase() {
  await client.close();
}

export { app, startServer, stopServer };
