package com.agilefox.projects.service.impl;

import com.agilefox.projects.dto.ProjectRequestDTO;
import com.agilefox.projects.dto.ProjectResponseDTO;
import com.agilefox.projects.exceptions.ResourceNotFoundException;
import com.agilefox.projects.model.EstimationType;
import com.agilefox.projects.model.Project;
import com.agilefox.projects.repository.ProjectRepository;
import com.agilefox.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectResponseDTO addProject(ProjectRequestDTO projectRequestDTO) {
        Project project = Project.builder()
                .name(projectRequestDTO.getName())
                .description(projectRequestDTO.getDescription())
                .estimationType(EstimationType.valueOf(projectRequestDTO.getEstimation_type()))
                .abbrev(projectRequestDTO.getAbbrev())
                .build();

        projectRepository.save(project);

        log.info("Succesfully added project");

        return new ProjectResponseDTO(project.getId(), project.getName(), project.getDescription(), project.getEstimationType(), project.getAbbrev());
    }

    public List<ProjectResponseDTO> getAllProjects(){
        List<Project> projects = projectRepository.findAll();

        return projects.stream().map(project -> new ProjectResponseDTO(project.getId(), project.getName(), project.getDescription(), project.getEstimationType(), project.getAbbrev())).collect(Collectors.toList());
    }

    @Override
    public ProjectResponseDTO getProjectById(Long id){
        if(projectRepository.findById(id).isPresent()){
            Project project = projectRepository.findById(id).get();
            return new ProjectResponseDTO(project.getId(), project.getName(), project.getDescription(), project.getEstimationType(), project.getAbbrev());
        } else {
            throw new ResourceNotFoundException("Project with id " + id + " not found");
        }
    }

    @Override
    public void deleteProjectById(Long id){
        log.info("START - Deleting project {}", id);

        Project project = projectRepository.findById(id).orElse(null);
        if(project != null){
            projectRepository.delete(project);
            log.info("END - Deleting project {}", id);
        } else{
            log.error("Project with id {} not found", id);
            throw new ResourceNotFoundException("Project with id " + id + " not found");
        }
    }
}
