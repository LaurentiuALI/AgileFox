package com.agilefox.projects.service;

import com.agilefox.projects.dto.ProjectResponseDTO;
import com.agilefox.projects.dto.UserResponseDTO;

import java.util.List;

public interface ProjectUserService {
    void addUserToProject(Long projectId, String keycloakUserId);

    List<ProjectResponseDTO> getProjectOfUser(String username);
    List<UserResponseDTO> getUsersOfProject(Long projectId);
}
