import axios from 'axios';
import { TaskItem } from '../types/task';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  async getAllTasks(): Promise<TaskItem[]> {
    const response = await api.get<TaskItem[]>('/tasks');
    return response.data;
  },

  async createTask(description: string): Promise<TaskItem> {
    const response = await api.post<TaskItem>('/tasks', {
      description,
      isCompleted: false,
    });
    return response.data;
  },

  async updateTask(id: string, task: Partial<TaskItem>): Promise<TaskItem> {
    const response = await api.put<TaskItem>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
