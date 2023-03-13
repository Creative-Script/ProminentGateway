import { Collection, Db, MongoClient } from "mongodb";
import { Gateway } from "../interfaces/gateway";
import { GATEWAYS_COLLECTION_NAME, MONGO_URI } from "./constants";


let db: Db;
let client: any;
let gatewaysCollection: Collection<Gateway>;
let m=0;

export async function connectToDatabase() {
  try {
    client = await MongoClient.connect(MONGO_URI,{
      connectTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 60000, // 1 minute
    });
    //console.log(`connecting to db ${GATEWAYS_COLLECTION_NAME} ${++m}`);
    db = client.db();
    gatewaysCollection = db.collection(GATEWAYS_COLLECTION_NAME);
    
  } catch (error) {
    console.log(error)
  }
  
}
export async function emptyDatabase() {
  gatewaysCollection.deleteMany({});
  //console.log(`database ${GATEWAYS_COLLECTION_NAME} emptied`);
}
// await connectToDatabase();
export {
    db,client,gatewaysCollection
};
