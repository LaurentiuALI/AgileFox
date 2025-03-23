package com.agilefox.projects.service;

import com.agilefox.projects.dto.ProjectRequestDTO;
import com.agilefox.projects.dto.ProjectResponseDTO;

import java.util.List;

public interface ProjectService {
    public ProjectResponseDTO addProject(ProjectRequestDTO project);
    public List<ProjectResponseDTO> getAllProjects();
    public ProjectResponseDTO getProjectById(Long id);
    void addUserToProject(Long projectId, String username);
    public void deleteProjectById(Long id);
}

