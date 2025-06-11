package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.Project.ProjectResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.exceptions.StateAlreadyExistsException;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.StateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class StateServiceImpl implements StateService {
    private final StateRepository stateRepository;
    private final ProjectClient projectClient;
    private final BacklogItemRepository backlogItemRepository;
    private final TypeRepository typeRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<StateResponseDTO> getStates() {
        log.info("Query for projects");
        List<State> states = stateRepository.findAll();
        if (states.isEmpty()) {
            return new ArrayList<>();
        } else {
            return states.stream().map(state -> new StateResponseDTO(state.getId(), state.getName(), state.getDescription(), state.getProjectId(), state.getStateOrder(), state.getType().getId())).collect(Collectors.toList());
        }
    }

    @Override
    public List<StateResponseDTO> getStatesOfProject(Long id) {
        log.info("START - Query for state with id {}", id);
        List<State> states = stateRepository.findByProjectId(id);

        return states.stream().map(state -> new StateResponseDTO(state.getId(), state.getName(), state.getDescription(), state.getProjectId(), state.getStateOrder(), state.getType().getId())).collect(Collectors.toList());
    }

    public StateResponseDTO getFirstStateOfType(Long typeId) {
        List<StateResponseDTO> states = getStatesOfType(typeId);
        if (states.isEmpty()) {
            log.info("No state found for type {}", typeId);
            throw new ResourceNotFoundException("No state found for type " + typeId);
        } else {
            StateResponseDTO firstState = states.getFirst();
            for( StateResponseDTO state : states ) {
                if (state.getStateOrder() < firstState.getStateOrder()) {
                    firstState = state;
                }
            }
            return firstState;
        }

    }

    @Override
    public List<StateResponseDTO> getStatesOfType(Long typeId){
        return stateRepository.findByTypeIdOrderByStateOrderAsc(typeId).stream().map(state -> new StateResponseDTO(state.getId(), state.getName(), state.getDescription(), state.getProjectId(), state.getStateOrder(), state.getType().getId())).collect(Collectors.toList());
    }

    @Override
    public StateResponseDTO getNextStateOfType(Long projectId, Long typeId, Long stateId) {

        State currState = stateRepository.findById(stateId).orElseThrow(() -> new ResourceNotFoundException("State not found"));

        List<State> states = stateRepository.findByProjectId(projectId);
        List<State> statesOfType = states.stream().filter(state -> Objects.equals(state.getType().getId(), typeId)).toList();

        int maxStateOrder = statesOfType.stream().mapToInt(State::getStateOrder).max().orElseThrow(() -> new ResourceNotFoundException("No state found for type " + typeId));

        if(currState.getStateOrder() < maxStateOrder){
            int nextStateOrder = currState.getStateOrder() + 1;

            State nextState = stateRepository.findByProjectIdAndTypeIdAndStateOrderEquals(projectId, typeId, nextStateOrder);

            return modelMapper.map(nextState, StateResponseDTO.class);
        } else {
            return modelMapper.map(currState, StateResponseDTO.class);
        }

    }

    @Override
    public StateResponseDTO addState( StateRequestDTO stateRequest){
        log.info("START - Adding state {}", stateRequest);

        Type existingType = typeRepository.findById(stateRequest.getTypeId()).orElseThrow(() -> new ResourceNotFoundException("Type not found"));

        State existingState = stateRepository.findByNameAndTypeId(stateRequest.getName(), stateRequest.getTypeId()).orElse(null);

        if(existingState != null) {
            log.info("END - Adding state {}", stateRequest);
            throw new StateAlreadyExistsException("The state with name " + stateRequest.getName() + " already exists");
        }

        log.info("START - query for project existence with id {}", stateRequest.getProjectId());
        ProjectResponseDTO project = projectClient.getProjectById(stateRequest.getProjectId());
        log.info("END - query for project existence with id {}", stateRequest.getProjectId());

        if(project != null){

            int statesCount = stateRepository.findByTypeIdOrderByStateOrderAsc(stateRequest.getTypeId()).size();
            int orderCount = statesCount == 0 ? 1 : statesCount + 1;

            State state = State.builder()
                    .name(stateRequest.getName())
                    .description(stateRequest.getDescription())
                    .projectId(stateRequest.getProjectId())
                    .type(existingType)
                    .stateOrder(orderCount)
                    .build();
            stateRepository.save(state);
            log.info("END - Adding state {}", stateRequest);
            return new StateResponseDTO(state.getId(), state.getName(), state.getDescription(), state.getProjectId(), state.getStateOrder(), state.getType().getId());
        } else {
            log.error("Project with id {} not found", stateRequest.getProjectId());
            log.info("END - query for project existence with id {}", stateRequest.getProjectId());
            throw new ResourceNotFoundException("The project with id " + stateRequest.getProjectId() + " could not be found");
        }
    }

    @Override
    public void deleteStateById(Long id){
        log.info("START - Deleting state {}", id);

        State state = stateRepository.findById(id).orElse(null);

        if (backlogItemRepository.countByStateId(id) > 0) {
            throw new IllegalStateException("State is still in use");
        }

        if(state != null){
            stateRepository.delete(state);
            log.info("END - Deleting state {}", id);
        } else{
            log.error("State with id {} not found", id);
            throw new ResourceNotFoundException("State with id " + id + " not found");
        }
    }

    @Override
    public StateResponseDTO updateState(StateRequestDTO stateRequest){
        log.info("START - Updating state {}", stateRequest);
        log.info("START - Updating state {}", stateRequest.getId());
        State state = stateRepository.findById(stateRequest.getId()).orElse(null);
        if(state != null){
            state.setName(stateRequest.getName());
            state.setDescription(stateRequest.getDescription());
            state.setStateOrder(stateRequest.getStateOrder());


            stateRepository.save(state);
            log.info("END - Updating state {}", stateRequest.getId());
            return new StateResponseDTO(stateRequest.getId(), state.getName(), state.getDescription(), state.getProjectId(), state.getStateOrder(), state.getType().getId());
        } else{
            log.error("State with id {} not found", stateRequest.getId());
            throw new ResourceNotFoundException("State with id " + stateRequest.getId() + " not found");
        }
    }

}
