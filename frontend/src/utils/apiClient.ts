import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    // Create axios instance with base configuration
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for global error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Centralized error handling
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  // Centralized error handling
  private handleError(error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 404:
          console.error('Resource not found.');
          break;
        case 500:
          console.error('Internal Server Error.');
          break;
        default:
          console.error('An unexpected error occurred.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
  }

  // Generic GET request
  async getTasks<T>(page: number, limit: number = 10): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.get<T>('/tasks', {
        params: { page, limit },
      });
    } catch (error) {
      throw error;
    }
  }

  // Generic POST request to create a task
  async createTask<T>(data: any): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.post<T>('/tasks', data);
    } catch (error) {
      throw error;
    }
  }

  // Generic PUT request to update a task
  async updateTask<T>(id: string, data: any): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.put<T>(`/tasks/${id}`, data);
    } catch (error) {
      throw error;
    }
  }

  // Generic DELETE request to delete a task
  async deleteTask<T>(id: string): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.delete<T>(`/tasks/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Helper method for file uploads
  async upload<T>(url: string, file: File, additionalData?: any): Promise<AxiosResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    // Append additional data if provided
    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.instance.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

export default apiClient;
