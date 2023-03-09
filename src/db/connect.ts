import { Collection, Db, MongoClient } from "mongodb";
import { Gateway } from "../interfaces/gateway";

const MONGO_URI = 'mongodb+srv://m001-student:testdb12@sandbox.xwjuiuq.mongodb.net/?retryWrites=true&w=majority'
const GATEWAYS_COLLECTION_NAME = 'gateway';


let db: Db;
let client: any;
let gatewaysCollection: Collection<Gateway>;
let m=0;

export async function connectToDatabase() {
  client = await MongoClient.connect(MONGO_URI);
  console.log(m++);
  db = client.db();
  gatewaysCollection = db.collection(GATEWAYS_COLLECTION_NAME);
}
// await connectToDatabase();
export {
    db,client,gatewaysCollection
};
