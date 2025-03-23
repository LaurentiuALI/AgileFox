package com.agilefox.projects.repository;

import com.agilefox.projects.model.Project;
import com.agilefox.projects.model.ProjectUser;
import com.agilefox.projects.model.ProjectUserId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, ProjectUserId> {
    boolean existsByProjectIdAndUserId(Long projectId, String userId);
    List<ProjectUser> findByProjectId(Long projectId);
    List<ProjectUser> findByUserId(String userId);
}