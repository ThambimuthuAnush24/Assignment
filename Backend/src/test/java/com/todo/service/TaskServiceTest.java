package com.todo.service;

import com.todo.entity.Task;
import com.todo.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldCreateTask() {
        // Given
        Task task = new Task("Test Task", "Description");
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When
        Task result = taskService.createTask(task);

        // Then
        assertNotNull(result);
        assertEquals("Progress", result.getStatus());
        verify(taskRepository).save(task);
    }

    @Test
    void shouldGetRecentTasks() {
        // Given
        List<Task> tasks = Arrays.asList(new Task(), new Task());
        when(taskRepository.findTop5ByStatusOrderByCreatedDateDesc()).thenReturn(tasks);

        // When
        List<Task> result = taskService.getRecentTasks();

        // Then
        assertEquals(2, result.size());
        verify(taskRepository).findTop5ByStatusOrderByCreatedDateDesc();
    }

    @Test
    void shouldMarkTaskAsCompleted() {
        // Given
        Task task = new Task("Test", "Desc");
        task.setTaskId(1L);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When
        Task result = taskService.markAsCompleted(1L);

        // Then
        assertEquals("Completed", result.getStatus());
        assertNotNull(result.getCompletedDate());
        verify(taskRepository).save(task);
    }

    @Test
    void shouldUpdateTask() {
        // Given
        Task existing = new Task("Old", "Old Desc");
        existing.setTaskId(1L);
        Task updated = new Task("New", "New Desc");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenReturn(existing);

        // When
        Task result = taskService.updateTask(1L, updated);

        // Then
        assertEquals("New", result.getTaskName());
        assertEquals("New Desc", result.getDescription());
        verify(taskRepository).save(existing);
    }

    @Test
    void shouldDeleteTask() {
        // Given
        Task task = new Task("Test", "Desc");
        task.setTaskId(1L);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // When
        taskService.deleteTask(1L);

        // Then
        verify(taskRepository).delete(task);
    }
}
