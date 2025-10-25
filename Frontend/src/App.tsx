import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TaskItem, FilterType } from './types/task';
import { taskService } from './services/taskService';
import { localStorageService } from './utils/localStorage';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Checkbox } from './components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    localStorageService.saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      const localTasks = localStorageService.loadTasks();
      setTasks(localTasks);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTaskDescription.trim()) return;

    try {
      const newTask = await taskService.createTask(newTaskDescription);
      setTasks(prev => [...prev, newTask]);
      setNewTaskDescription('');
    } catch (error) {
      console.error('Failed to create task:', error);
      const localTask: TaskItem = {
        id: crypto.randomUUID(),
        description: newTaskDescription,
        isCompleted: false,
      };
      setTasks(prev => [...prev, localTask]);
      setNewTaskDescription('');
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      await taskService.updateTask(id, updatedTask);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to update task:', error);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.isCompleted;
      case 'completed':
        return task.isCompleted;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Task Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask} disabled={!newTaskDescription.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({tasks.length})
              </Button>
              <Button
                variant={filter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('active')}
              >
                Active ({tasks.filter(t => !t.isCompleted).length})
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed ({tasks.filter(t => t.isCompleted).length})
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {filter === 'all' ? 'No tasks yet. Add one above!' : 
                 filter === 'active' ? 'No active tasks!' : 'No completed tasks!'}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      checked={task.isCompleted}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <span
                      className={`flex-1 ${
                        task.isCompleted
                          ? 'line-through text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {task.description}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
