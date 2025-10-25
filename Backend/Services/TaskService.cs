using TaskManager.Api.Models;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    Task<IEnumerable<TaskItem>> GetAllTasksAsync();
    Task<TaskItem?> GetTaskByIdAsync(Guid id);
    Task<TaskItem> CreateTaskAsync(TaskItem task);
    Task<TaskItem?> UpdateTaskAsync(Guid id, TaskItem task);
    Task<bool> DeleteTaskAsync(Guid id);
}

public class TaskService : ITaskService
{
    private readonly List<TaskItem> _tasks = new();

    public Task<IEnumerable<TaskItem>> GetAllTasksAsync()
    {
        return Task.FromResult<IEnumerable<TaskItem>>(_tasks);
    }

    public Task<TaskItem?> GetTaskByIdAsync(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        return Task.FromResult(task);
    }

    public Task<TaskItem> CreateTaskAsync(TaskItem task)
    {
        task.Id = Guid.NewGuid();
        _tasks.Add(task);
        return Task.FromResult(task);
    }

    public Task<TaskItem?> UpdateTaskAsync(Guid id, TaskItem task)
    {
        var existingTask = _tasks.FirstOrDefault(t => t.Id == id);
        if (existingTask == null) return Task.FromResult<TaskItem?>(null);

        existingTask.Description = task.Description;
        existingTask.IsCompleted = task.IsCompleted;
        return Task.FromResult<TaskItem?>(existingTask);
    }

    public Task<bool> DeleteTaskAsync(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return Task.FromResult(false);

        _tasks.Remove(task);
        return Task.FromResult(true);
    }
}
