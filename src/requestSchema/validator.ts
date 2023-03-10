import { Request, Response, NextFunction } from 'express';
import { gatewaySchema, peripheralDevice } from './gateway';

export const validateGateway = (req: Request, res: Response, next: NextFunction) => {
  const { error } = gatewaySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export const validatePeripheralDevice = (req: Request, res: Response, next: NextFunction) => {
    const { error } = peripheralDevice.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };