import Joi from 'joi';



export const peripheralDevice = Joi.object({
  uid: Joi.number().integer().min(1),
  vendor: Joi.string().required(),
  status: Joi.string().valid("online", "offline").default("online").required(),
  dateCreated: Joi.date().default((new Date()).toISOString())
});
export const gatewaySchema = Joi.object({
  ipv4Address: Joi.string().ip().required(),
  serialNumber: Joi.string().required(),
  peripheralDevices: Joi.array().items(peripheralDevice).max(10).default([])
});
