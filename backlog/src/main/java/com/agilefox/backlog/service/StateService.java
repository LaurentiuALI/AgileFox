package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.BacklogItem.State.StateRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;

import java.util.List;

public interface StateService {
    List<StateResponseDTO> getStates();
    List<StateResponseDTO> getStatesOfType(Long typeId);
    List<StateResponseDTO> getStatesOfProject(Long id);
    StateResponseDTO getNextStateOfType(Long projectId, Long typeId, Long stateId );
    public StateResponseDTO addState( StateRequestDTO stateRequest);
    public StateResponseDTO updateState(StateRequestDTO stateRequest);
    public void deleteStateById(Long id);
}
