package com.todo.repository;

import com.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Find top 5 tasks with status "Progress" ordered by created date descending
    @Query("SELECT t FROM Task t WHERE t.status = 'Progress' ORDER BY t.createdDate DESC")
    List<Task> findTop5ByStatusOrderByCreatedDateDesc();
}
