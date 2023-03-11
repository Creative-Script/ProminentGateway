import { Collection, Db, MongoClient } from "mongodb";
import { Gateway } from "../interfaces/gateway";
import { GATEWAYS_COLLECTION_NAME, MONGO_URI } from "./constants";


let db: Db;
let client: any;
let gatewaysCollection: Collection<Gateway>;
let m=0;

export async function connectToDatabase() {
  client = await MongoClient.connect(MONGO_URI);
  console.log(`connecting to db ${GATEWAYS_COLLECTION_NAME} ${++m}`);
  db = client.db();
  gatewaysCollection = db.collection(GATEWAYS_COLLECTION_NAME);
}
export async function emptyDatabase() {
  gatewaysCollection.deleteMany({})
}
// await connectToDatabase();
export {
    db,client,gatewaysCollection
};
