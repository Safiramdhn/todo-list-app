import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err); // Log the error (you might want to use a logger like Winston or Bunyan)
  res.status(500).json({
    message: 'Internal Server Error',
  });
}
