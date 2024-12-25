"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const uuid_1 = require("uuid");
class TaskService {
    // Create a new task
    static create(data) {
        const newTask = {
            id: (0, uuid_1.v4)(),
            title: data.title,
            description: data.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.unshift(newTask); // Add to the beginning of the array
        console.log(`Created new task with ID: ${newTask.id}`); // Log task creation
        return newTask;
    }
    // Get tasks with pagination
    static findAll(page, limit = 10) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit; // Adjusted calculation
        console.log(`Fetching tasks - Page: ${page}, Limit: ${limit}, Total Tasks: ${this.tasks.length}`);
        return this.tasks.slice(startIndex, endIndex); // Return a slice of tasks based on pagination
    }
    // Find a task by its ID
    static findById(id) {
        console.log(`Searching for task with ID: ${id}`);
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            console.log(`Task found: ${task.id}`);
        }
        else {
            console.log(`Task not found with ID: ${id}`);
        }
        return task;
    }
    // Update a task by its ID
    static update(id, data) {
        console.log(`Updating task with ID: ${id}`);
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) {
            console.log(`Task not found with ID: ${id}`);
            return undefined; // Return undefined if task is not found
        }
        const updatedTask = Object.assign(Object.assign(Object.assign({}, this.tasks[index]), data), { updatedAt: new Date() });
        this.tasks[index] = updatedTask; // Save the updated task back to the array
        console.log(`Task updated with ID: ${updatedTask.id}`);
        return updatedTask;
    }
    // Delete a task by its ID
    static delete(id) {
        console.log(`Deleting task with ID: ${id}`);
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id); // Filter out the task by ID
        const deleted = this.tasks.length !== initialLength;
        if (deleted) {
            console.log(`Task deleted with ID: ${id}`);
        }
        else {
            console.log(`No task found to delete with ID: ${id}`);
        }
        return deleted; // Return true if task was deleted
    }
}
exports.TaskService = TaskService;
TaskService.tasks = [];
