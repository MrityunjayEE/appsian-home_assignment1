import { TaskItem } from '../types/task';

const STORAGE_KEY = 'taskManager_tasks';

export const localStorageService = {
  saveTasks(tasks: TaskItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  loadTasks(): TaskItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  clearTasks(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
