package com.todo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.entity.Task;
import com.todo.service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldGetAllTasks() throws Exception {
        // Given
        List<Task> tasks = Arrays.asList(new Task("Task 1", "Desc 1"));
        when(taskService.getRecentTasks()).thenReturn(tasks);

        // When & Then
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].taskName").value("Task 1"));
    }

    @Test
    void shouldCreateTask() throws Exception {
        // Given
        Task task = new Task("New Task", "Description");
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        // When & Then
        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCompleteTask() throws Exception {
        // Given
        Task task = new Task("Task", "Desc");
        when(taskService.markAsCompleted(1L)).thenReturn(task);

        // When & Then
        mockMvc.perform(put("/api/tasks/1/complete"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldUpdateTask() throws Exception {
        // Given
        Task task = new Task("Updated", "Updated Desc");
        when(taskService.updateTask(eq(1L), any(Task.class))).thenReturn(task);

        // When & Then
        mockMvc.perform(put("/api/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldDeleteTask() throws Exception {
        // When & Then
        mockMvc.perform(delete("/api/tasks/1"))
                .andExpect(status().isOk());
    }
}
