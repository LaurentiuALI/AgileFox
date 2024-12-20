package com.agilefox.backlog.repository;

import com.agilefox.backlog.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    public List<Type> findByProjectId(Long projectId);
}
