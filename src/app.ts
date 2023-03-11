import express from 'express';
import { client, connectToDatabase } from './db/connect';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';

import { createGateway } from './views/createGateway';
import { deleteGateway } from './views/deleteGateway';
import { getAllGateways } from './views/getAllGateways';
import { getGateway } from './views/getGateway';
import { updateGateway } from './views/updateGateway';
import { validateGateway, validatePeripheralDevice } from './requestSchema/validator';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

client;
async function startServer() {
  await connectToDatabase();
  app.post('/gateways', validateGateway, createGateway);
  app.get('/gateways/:id', getGateway);
  app.put('/gateways/:id',validateGateway, updateGateway);
  app.delete('/gateways/:id', deleteGateway);
  app.get('/gateways', getAllGateways);
  app.get('/gateways/:id/peripheralDevices', );
  app.post('/gateways/:id/peripheralDevices',validatePeripheralDevice);
  app.put('/gateways/:id/peripheralDevices/:uid',validatePeripheralDevice,);
  app.delete('/gateways/:id/peripheralDevices/:uid');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

async function stopServer() {
  await disconnectFromDatabase();
}
async function disconnectFromDatabase() {
    await client.close();
}

export { app,startServer, stopServer };