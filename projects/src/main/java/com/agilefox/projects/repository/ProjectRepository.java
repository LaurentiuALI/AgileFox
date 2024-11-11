package com.agilefox.projects.repository;

import com.agilefox.projects.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository  extends JpaRepository<Project, Long> {
}
