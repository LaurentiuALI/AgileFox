package com.agilefox.projects.service.impl;

import com.agilefox.projects.client.UserClient;
import com.agilefox.projects.dto.ProjectResponseDTO;
import com.agilefox.projects.dto.UserResponseDTO;
import com.agilefox.projects.model.Project;
import com.agilefox.projects.model.ProjectUser;
import com.agilefox.projects.repository.ProjectRepository;
import com.agilefox.projects.repository.ProjectUserRepository;
import com.agilefox.projects.service.ProjectUserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectUserServiceImpl implements ProjectUserService {
    private final ProjectUserRepository projectUserRepository;
    private final ProjectRepository projectRepository;
    private final UserClient userClient;
    private final ModelMapper modelMapper;

    public void addUserToProject(Long projectId, String keycloakUserId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        projectUserRepository.save(
                ProjectUser.builder()
                        .project(project)
                        .userId(keycloakUserId)
                        .build()
        );
    }

    public List<ProjectResponseDTO> getProjectOfUser(String username) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isProductOwner = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> "ROLE_product owner".equals(grantedAuthority.getAuthority()));

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> "ROLE_admin".equals(grantedAuthority.getAuthority()));

        if(isProductOwner || isAdmin) {
            return projectRepository.findAll().stream().map(project -> modelMapper.map(project, ProjectResponseDTO.class)).collect(Collectors.toList());
        }

        String keycloakUserId = userClient.getUser(username);
        List<ProjectUser> projectUserList = projectUserRepository.findByUserId(keycloakUserId);

        List<Project> projectList = new ArrayList<>();

        for (ProjectUser projectUser : projectUserList) {
            projectList.add(projectUser.getProject());
        }

        return projectList.stream().map(project -> modelMapper.map(project, ProjectResponseDTO.class)).collect(Collectors.toList());

    }

    public List<UserResponseDTO> getUsersOfProject(Long projectId) {
        List<UserResponseDTO> allUsers = userClient.getUsers();
        List<ProjectUser> projectUsers = projectUserRepository.findByProjectId(projectId);

        List<UserResponseDTO> usersOfProject = new ArrayList<>();
        for (ProjectUser projectUser : projectUsers) {

            List<UserResponseDTO> associatedUsers = allUsers.stream().filter(currentUser -> Objects.equals(currentUser.getId(), projectUser.getUserId())).toList();
            usersOfProject.addAll(associatedUsers);
        }

        return usersOfProject;
    }

    public boolean hasAccess(String userId, Long projectId) {
        return projectUserRepository.existsByProjectIdAndUserId(projectId, userId);
    }
}