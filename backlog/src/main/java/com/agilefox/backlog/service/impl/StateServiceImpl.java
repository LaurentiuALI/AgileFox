package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.StateResponseDTO;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.service.StateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class StateServiceImpl implements StateService {
    private final StateRepository stateRepository;
    private final ProjectClient projectClient;

    @Override
    public List<StateResponseDTO> getStates() {
        log.info("Query for projects");
        List<State> states = stateRepository.findAll();
        if (states.isEmpty()) {
            return new ArrayList<>();
        } else {
            return states.stream().map(state -> new StateResponseDTO(state.getId(), state.getName(), state.getDescription(), state.getProjectId())).collect(Collectors.toList());
        }
    }

    @Override
    public StateResponseDTO getStateById(Long id) {
        log.info("START - Query for state with id {}", id);
        Optional<State> state = stateRepository.findById(id);
        if (state.isPresent()) {
            log.info("END - Query for state with id {}", id);
            return new StateResponseDTO(state.get().getId(), state.get().getName(), state.get().getDescription(), state.get().getProjectId());
        } else {
            log.info("END - Query for state with id {}", id);
            return null;
        }
    }

    @Override
    public StateResponseDTO addState(StateRequestDTO stateRequest){
        log.info("START - Adding state {}", stateRequest);

        log.info("START - query for project existence with id {}", stateRequest.getProjectId());
        var projectExist = projectClient.projectExist(stateRequest.getProjectId());
        log.info("END - query for project existence with id {}", stateRequest.getProjectId());
        if(projectExist){
            State state = State.builder()
                    .name(stateRequest.getName())
                    .description(stateRequest.getDescription())
                    .projectId(stateRequest.getProjectId())
                    .build();
            stateRepository.save(state);
            log.info("END - Adding state {}", stateRequest);
        } else {
            log.error("Project with id {} not found", stateRequest.getProjectId());
        }
        log.info("END - Adding state {}", stateRequest);
        return null;
    }

    @Override
    public void deleteStateById(Long id){
        log.info("START - Deleting state {}", id);

        State state = stateRepository.findById(id).orElse(null);
        if(state != null){
            stateRepository.delete(state);
            log.info("END - Deleting state {}", id);
        } else{
            log.error("State with id {} not found", id);
        }
    }

    @Override
    public StateResponseDTO updateState(Long id, StateRequestDTO stateRequest){
        log.info("START - Updating state {}", id);
        State state = stateRepository.findById(id).orElse(null);
        if(state != null){
            state.setName(stateRequest.getName());
            state.setDescription(stateRequest.getDescription());

            stateRepository.save(state);
            log.info("END - Updating state {}", id);
            return new StateResponseDTO(id, state.getName(), state.getDescription(), state.getProjectId());
        } else{
            log.error("State with id {} not found", id);
            return null;
        }
    }

}
