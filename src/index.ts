import express from 'express';
import { client, connectToDatabase } from './db/connect';
import swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';

import { createGateway } from './views/createGateway';
import { deleteGateway } from './views/deleteGateway';
import { getAllGateways } from './views/getAllGateways';
import { getGateway } from './views/getGateway';
import { updateGateway } from './views/updateGateway';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


async function startServer() {
  await connectToDatabase();
  app.post('/gateways', createGateway);
  app.get('/gateways/:id', getGateway);
  app.put('/gateways/:id', updateGateway);
  app.delete('/gateways/:id', deleteGateway);
  app.get('/gateways', getAllGateways);
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
startServer();
