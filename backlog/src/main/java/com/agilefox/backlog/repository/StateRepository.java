package com.agilefox.backlog.repository;

import com.agilefox.backlog.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
    public Optional<State> findByName(String name);
    public List<State> findByProjectId(Long projectId);
}
