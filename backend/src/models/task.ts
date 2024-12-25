export interface Task {
    id: string;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
  }
  
  export interface UpdateTaskDTO {
    title?: string;
    description?: string;
  }