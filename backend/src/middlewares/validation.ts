import { Request, Response, NextFunction } from 'express';
import { CreateTaskDTO } from '../models/task';

export function validateCreateTask(req: Request, res: Response, next: NextFunction) : any {
  const { title, description }: CreateTaskDTO = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  next();
}
