import { CreateTaskDTO, Task, UpdateTaskDTO } from '../models/task';
import { v4 as uuid } from 'uuid';

export class TaskService {
  private static tasks: Task[] = [];

  // Create a new task
  static create(data: CreateTaskDTO): Task {
    const newTask: Task = {
      id: uuid(),
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
  static findAll(page: number, limit: number = 10): Task[] {
    if (limit <= 0) {
        console.warn('Limit must be a positive number.');
        return [];
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    console.log(`Fetching tasks - Page: ${page}, Limit: ${limit}, Total Tasks: ${this.tasks.length}`);

    // Sort tasks by createdAt in descending order (latest first)
    const sortedTasks = [...this.tasks].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB.getTime() - dateA.getTime();
    });

    // Handle the case where page exceeds available tasks
    if (startIndex >= this.tasks.length) {
        console.log(`Page ${page} exceeds available tasks, returning empty array.`);
        return []; // No tasks available for this page
    }

    // Return a slice of tasks based on pagination
    return sortedTasks.slice(startIndex, endIndex);
}

  // Find a task by its ID
  static findById(id: string): Task | undefined {
    console.log(`Searching for task with ID: ${id}`);
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      console.log(`Task found: ${task.id}`);
    } else {
      console.log(`Task not found with ID: ${id}`);
    }
    return task;
  }

  // Update a task by its ID
  static update(id: string, data: UpdateTaskDTO): Task | undefined {
    console.log(`Updating task with ID: ${id}`);
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      console.log(`Task not found with ID: ${id}`);
      return undefined; // Return undefined if task is not found
    }

    const updatedTask: Task = {
      ...this.tasks[index],
      ...data,
      updatedAt: new Date(),
    };
    this.tasks[index] = updatedTask; // Save the updated task back to the array
    console.log(`Task updated with ID: ${updatedTask.id}`);
    return updatedTask;
  }

  // Delete a task by its ID
  static delete(id: string): boolean {
    console.log(`Deleting task with ID: ${id}`);
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id); // Filter out the task by ID
    const deleted = this.tasks.length !== initialLength;
    if (deleted) {
      console.log(`Task deleted with ID: ${id}`);
    } else {
      console.log(`No task found to delete with ID: ${id}`);
    }
    return deleted; // Return true if task was deleted
  }
}
