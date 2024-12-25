import express from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateCreateTask } from '../middlewares/validation';
import { logger } from '../middlewares/logger';
import { errorHandler } from '../middlewares/errorHandler';

const router = express.Router();

// Log all incoming requests
router.use(logger);

// Routes for managing tasks
router.post('/', validateCreateTask, TaskController.createTask); // validate input before creating
router.get('/', TaskController.getTasks);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

router.use(errorHandler)

export default router;
