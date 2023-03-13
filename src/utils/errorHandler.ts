import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  res.status(500).send('Internal server error');
}

export default errorHandler;