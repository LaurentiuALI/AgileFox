package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.BacklogItem.State.StateRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.service.StateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/state")
public class StateController {
    private final StateService stateService;

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public List<StateResponseDTO> getStates(@RequestParam(name = "projectId", required = false) Long projectId) {
        if (projectId != null) {
            return stateService.getStatesOfProject(projectId); // Call this method if projectId is provided
        } else {
            return stateService.getStates(); // Call this method if projectId is not provided
        }
    }

    @GetMapping("/type/{typeId}")
    @ResponseStatus(HttpStatus.FOUND)
    public List<StateResponseDTO> getStatesByTypeId(@PathVariable Long typeId) {
            return stateService.getStatesOfType(typeId); // Call this method if projectId is not provided
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public StateResponseDTO updateState(@RequestBody StateRequestDTO stateRequestDTO) {
        return stateService.updateState(stateRequestDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStateById(@PathVariable Long id){ stateService.deleteStateById(id);}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StateResponseDTO createState(@RequestBody StateRequestDTO stateRequest) {
        return stateService.addState(stateRequest);
    }

}

