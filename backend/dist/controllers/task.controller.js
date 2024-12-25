"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
class TaskController {
    static createTask(req, res) {
        try {
            const { title, description } = req.body;
            if (!title) {
                console.log('Validation failed: Title is required'); // Log validation error
                return res.status(400).json({ message: 'Title is required' });
            }
            const newTask = task_service_1.TaskService.create({ title, description });
            console.log(`Task created successfully with ID: ${newTask.id}`); // Log successful creation
            return res.status(201).json(newTask);
        }
        catch (err) {
            console.error(`Error creating task: ${err}`); // Log error
            res.status(500).json({ message: `Internal Server Error: ${err}` });
        }
    }
    static getTasks(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            console.log(`Fetching tasks - Page: ${page}, Limit: ${limit}`);
            const tasks = task_service_1.TaskService.findAll(page, limit);
            console.log(`Fetched ${tasks.length} tasks from the database`);
            return res.json(tasks);
        }
        catch (err) {
            console.error(`Error fetching tasks: ${err}`); // Log error
            res.status(500).json({ message: `Internal Server Error: ${err}` });
        }
    }
    static updateTask(req, res) {
        const { id } = req.params;
        try {
            const { title, description } = req.body;
            console.log(`Updating task with ID: ${id}`);
            const updatedTask = task_service_1.TaskService.update(id, { title, description });
            if (!updatedTask) {
                console.log(`Task not found with ID: ${id}`); // Log task not found
                return res.status(404).json({ message: 'Task not found' });
            }
            console.log(`Task updated successfully with ID: ${updatedTask.id}`); // Log task update
            return res.json(updatedTask);
        }
        catch (err) {
            console.error(`Error updating task with ID: ${id}: ${err}`); // Log error
            res.status(500).json({ message: `Internal Server Error: ${err}` });
        }
    }
    static deleteTask(req, res) {
        const { id } = req.params;
        try {
            console.log(`Deleting task with ID: ${id}`);
            const deleted = task_service_1.TaskService.delete(id);
            if (!deleted) {
                console.log(`Task not found with ID: ${id}`); // Log task not found for deletion
                return res.status(404).json({ message: 'Task not found' });
            }
            console.log(`Task deleted successfully with ID: ${id}`); // Log successful deletion
            return res.status(204).send();
        }
        catch (err) {
            console.error(`Error deleting task with ID: ${id}: ${err}`); // Log error
            res.status(500).json({ message: `Internal Server Error: ${err}` });
        }
    }
}
exports.TaskController = TaskController;
