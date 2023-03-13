import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
export async function getGateway(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const gateway = await gatewaysCollection.findOne({ _id: new ObjectId(id) });
    if (!gateway) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(gateway);
    }
  } catch (error) {
    //console.log("error occured");
    //console.log(error);
    return res.status(500).json({ message: "Internal Server Error",error:error.message });
  }
}
