import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task';
import { sendSuccess, sendError } from '../utils/responseHelper';

export class TaskController {
  static async createTask(req: Request, res: Response) : Promise<any> {
    const { title, description }: CreateTaskDTO = req.body;

    if (!title) {
      console.log('Validation failed: Title is required'); // Log validation error
      return sendError(res, 'Title is required', 400);
    }

    try {
      const newTask = await TaskService.create({ title, description });
      console.log(`Task created successfully with ID: ${newTask.id}`); // Log successful creation
      return sendSuccess(res, newTask, 'Task created successfully', 201);
    } catch (err) {
      console.error(`Error creating task: ${err}`); // Log error
      return sendError(res, 'Internal Server Error');
    }
  }

  static async getTasks(req: Request, res: Response) : Promise<any> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      console.log(`Fetching tasks - Page: ${page}, Limit: ${limit}`);
      const tasks = await TaskService.findAll(page, limit);
      console.log(`Fetched ${tasks.length} tasks from the database`);
      return sendSuccess(res, tasks, 'Tasks fetched successfully');
    } catch (err) {
      console.error(`Error fetching tasks: ${err}`); // Log error
      return sendError(res, 'Internal Server Error');
    }
  }

  static async updateTask(req: Request, res: Response) : Promise<any> {
    const { id } = req.params;
    const { title, description }: UpdateTaskDTO = req.body;

    console.log(`Updating task with ID: ${id}`);
    try {
      const updatedTask = await TaskService.update(id, { title, description });
      if (!updatedTask) {
        console.log(`Task not found with ID: ${id}`); // Log task not found
        return sendError(res, 'Task not found', 404);
      }

      console.log(`Task updated successfully with ID: ${updatedTask.id}`); // Log task update
      return sendSuccess(res, updatedTask, 'Task updated successfully');
    } catch (err) {
      console.error(`Error updating task with ID: ${id}: ${err}`); // Log error
      return sendError(res, 'Internal Server Error');
    }
  }

  static async deleteTask(req: Request, res: Response) : Promise<any> {
    const { id } = req.params;

    console.log(`Deleting task with ID: ${id}`);
    try {
      const deletedTask = await TaskService.delete(id);
      if (!deletedTask) {
        console.log(`Task not found with ID: ${id}`); // Log task not found for deletion
        return sendError(res, 'Task not found', 404);
      }

      console.log(`Task deleted successfully with ID: ${id}`); // Log successful deletion
      return res.status(204).send();
    } catch (err) {
      console.error(`Error deleting task with ID: ${id}: ${err}`); // Log error
      return sendError(res, 'Internal Server Error');
    }
  }
}
