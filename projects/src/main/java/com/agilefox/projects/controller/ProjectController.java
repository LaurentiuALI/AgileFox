package com.agilefox.projects.controller;

import com.agilefox.projects.dto.ProjectRequestDTO;
import com.agilefox.projects.dto.ProjectResponseDTO;
import com.agilefox.projects.service.ProjectService;
import com.agilefox.projects.service.impl.ProjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectServiceImpl projectServiceImpl;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponseDTO createProject(@RequestBody ProjectRequestDTO projectRequest){
        return projectService.addProject(projectRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProjectResponseDTO> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProjectResponseDTO getProjectById(@PathVariable long id){
        return projectServiceImpl.getProjectById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProject(@PathVariable long id){
        projectService.deleteProjectById(id);
    }
}
