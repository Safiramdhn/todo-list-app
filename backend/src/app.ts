import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.route';

const app = express();

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

export default app;
