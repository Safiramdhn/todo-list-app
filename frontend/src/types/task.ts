export interface Task {
    id: string;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface TaskFormData {
    title: string;
    description?: string;
  }
  
  export interface PaginationParams {
    page: number;
    limit?: number;
  }