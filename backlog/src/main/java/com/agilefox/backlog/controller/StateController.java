package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.StateResponseDTO;
import com.agilefox.backlog.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/state")
public class StateController {
    private final StateService stateService;

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public List<StateResponseDTO> getStates(){
        return stateService.getStates();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public StateResponseDTO getStateById(@PathVariable Long id){
        return stateService.getStateById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StateResponseDTO createState(@RequestBody StateRequestDTO stateRequest) {
        return stateService.addState(stateRequest);
    }

}

