import { ObjectId } from "mongodb";
import { gatewaysCollection } from "../db/connect";
import { Gateway } from "../interfaces/gateway";
import express, { Request, Response } from 'express';

export async function createGateway(req: Request, res: Response) {
    const { serialNumber, name, ipv4Address, peripheralDevices } = req.body;
    const gateway: Gateway = {
      _id: new ObjectId(),
      serialNumber,
      name,
      ipv4Address,
      peripheralDevices,
    };
    await gatewaysCollection.insertOne(gateway);
    res.send(gateway);
  }
