import { Task, TaskFormData, PaginationParams } from '../types/task';
import apiClient from '../utils/apiClient';

export const taskService = {
  // Create a task
  async createTask(taskData: TaskFormData): Promise<Task> {
    try {
      const response = await apiClient.createTask<Task>(taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Get tasks with pagination
  async getTasks({ page, limit = 10 }: PaginationParams): Promise<Task[]> {
    try {
      const response = await apiClient.getTasks<Task[]>(page, limit);  // Corrected the misplaced parenthesis
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Update a task by ID
  async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<Task> {
    try {
      const response = await apiClient.updateTask<Task>(id, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task by ID
  async deleteTask(id: string): Promise<void> {
    try {
      await apiClient.deleteTask<void>(id);  // Corrected delete method usage
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
