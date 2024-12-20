package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.StateResponseDTO;

import java.util.List;

public interface StateService {
    List<StateResponseDTO> getStates();
    List<StateResponseDTO> getStatesOfProject(Long id);
    public StateResponseDTO addState(StateRequestDTO stateRequest);
    public StateResponseDTO updateState(Long id, StateRequestDTO stateRequest);
    public void deleteStateById(Long id);
}
