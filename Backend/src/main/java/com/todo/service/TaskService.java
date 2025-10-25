package com.todo.service;

import com.todo.entity.Task;
import com.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Get recent 5 tasks that are in progress
    public List<Task> getRecentTasks() {
        List<Task> tasks = taskRepository.findTop5ByStatusOrderByCreatedDateDesc();
        return tasks.size() > 5 ? tasks.subList(0, 5) : tasks;
    }

    // Create a new task
    public Task createTask(Task task) {
        task.setStatus("Progress");
        task.setCreatedDate(LocalDateTime.now());
        return taskRepository.save(task);
    }

    // Mark task as completed
    public Task markAsCompleted(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("Completed");
        task.setCompletedDate(LocalDateTime.now());
        return taskRepository.save(task);
    }

    // Update task
    public Task updateTask(Long taskId, Task taskDetails) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTaskName(taskDetails.getTaskName());
        task.setDescription(taskDetails.getDescription());
        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}
