package com.agilefox.backlog.unittests;


import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.StateResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.exceptions.StateAlreadyExistsException;
import com.agilefox.backlog.model.EstimationType;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.impl.StateServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class StateServiceUnitTest {

    private static final String stateName = "open";
    private static final String stateDescription = "This shows that the item is still open";
    private static final Long projectId = 1L;
    private static final Long id = 1L;

    private static State defaultState;

    @Mock
    private BacklogItemRepository backlogItemRepository;

    @Mock
    private StateRepository stateRepository;

    @Mock
    private TypeRepository typeRepository;

    @Mock
    private ProjectClient projectClient;

    @InjectMocks
    private StateServiceImpl stateService;

    @BeforeAll
    public static void setUp() {
        defaultState = new State();
        defaultState.setName(stateName);
        defaultState.setDescription(stateDescription);
        defaultState.setId(id);
        defaultState.setProjectId(projectId);
    }

    // GET ALL
    @Test
    public void getStatesWhenNoEmptyTest(){
        List<State> statesDefault = Collections.singletonList(defaultState);

        Mockito
                .when(this.stateRepository.findAll())
                .thenReturn(statesDefault);

        List<StateResponseDTO> fromService = this.stateService.getStates();

        Assertions.assertThat(fromService)
                .isNotNull()
                .isNotEmpty()
                .hasSize(1);

        StateResponseDTO response = fromService.getFirst();
        Assertions.assertThat(response)
                .hasFieldOrPropertyWithValue("name", stateName)
                .hasFieldOrPropertyWithValue("description", stateDescription)
                .hasFieldOrPropertyWithValue("projectId", projectId);

        Mockito.verify(stateRepository, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    @Test
    public void getStatesWhenEmptyTest() {
        List<State> states = new ArrayList<>();

        Mockito.when(stateRepository.findAll()).thenReturn(states);

        List<StateResponseDTO> result = stateService.getStates();

        Assertions.assertThat(result)
                .isNotNull()
                .hasSize(0)
                .isEmpty();


        Mockito.verify(stateRepository, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    // GET BY ID
    @Test
    public void getStateByIdWhenExistsTest() {
        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.of(defaultState));

        List<StateResponseDTO> response = stateService.getStatesOfProject(id);

        Assertions.assertThat(response.getFirst())
                .isNotNull()
                .hasFieldOrPropertyWithValue("id", defaultState.getId())
                .hasFieldOrPropertyWithValue("name", defaultState.getName())
                .hasFieldOrPropertyWithValue("description", defaultState.getDescription())
                .hasFieldOrPropertyWithValue("projectId", defaultState.getProjectId());

        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    @Test
    public void getStateByIdWhenNotExistsTest() {
        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.empty());

        Assertions.assertThatThrownBy(() -> stateService.getStatesOfProject(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("State with id " + id + " not found");

        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    // ADD STATE
    @Test
    public void addStateWhenStateDoesNotExistTest(){
        ProjectResponseDTO mockProject = new ProjectResponseDTO(
                1L,
                "Test Project",
                "Description of Test Project",
                EstimationType.DAYS,
                "TP"
        );

        Mockito
                .when(this.stateRepository.save(Mockito.any(State.class)))
                .thenReturn(defaultState);

        Mockito
                .when(this.stateRepository.findByName(stateName))
                        .thenReturn(Optional.empty());

        Mockito
                .when(this.projectClient.getProjectById(projectId))
                .thenReturn(mockProject);

        StateResponseDTO fromService = stateService.addState(new StateRequestDTO(defaultState));

        Assertions.assertThat(fromService)
                .isNotNull()
                .hasFieldOrPropertyWithValue("name", stateName)
                .hasFieldOrPropertyWithValue("description", stateDescription)
                .hasFieldOrPropertyWithValue("projectId", projectId);

        Mockito.verify(stateRepository, Mockito.times(1)).save(Mockito.any(State.class));
        Mockito.verify(projectClient, Mockito.times(1)).getProjectById(projectId);
        Mockito.verify(stateRepository, Mockito.times(1)).findByName(stateName);

        Mockito.verifyNoMoreInteractions(stateRepository, projectClient);
    }

    @Test
    public void throwExceptionWhenAddExistingStateTest(){
        Mockito.when(this.stateRepository.findByName(defaultState.getName()))
                .thenReturn(Optional.of(defaultState));

        Assertions.assertThatThrownBy(() -> stateService.addState(new StateRequestDTO(defaultState)))
                .isInstanceOf(StateAlreadyExistsException.class)
                .hasMessage("The state with name open already exists");

        Mockito.verify(stateRepository, Mockito.times(1)).findByName(defaultState.getName());
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    @Test
    public void throwExceptionWhenAddingStateAndProjectDoesNotExistTest(){
        Mockito.when(this.projectClient.getProjectById(defaultState.getProjectId()))
                .thenReturn(null);

        Mockito
                .when(this.stateRepository.findByName(stateName))
                .thenReturn(Optional.empty());

        Assertions.assertThatThrownBy(() -> stateService.addState(new StateRequestDTO(defaultState)))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("The project with id 1 could not be found");

        Mockito.verify(stateRepository, Mockito.times(1)).findByName(defaultState.getName());
        Mockito.verify(projectClient, Mockito.times(1)).getProjectById(defaultState.getProjectId());
        Mockito.verifyNoMoreInteractions(stateRepository);
    }


    //DELETE STATE
    @Test
    public void deleteStateWhenExistsTest() {
        State state = new State();
        state.setId(id);

        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.of(state));

        stateService.deleteStateById(id);

        Mockito.verify(stateRepository, Mockito.times(1)).delete(state);
        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    @Test
    public void deleteStateWhenNotExistsTest() {
        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.empty());

        Assertions.assertThatThrownBy(() -> stateService.deleteStateById(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("State with id " + id + " not found");

        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(stateRepository);
    }


    // UPDATE STATE
    @Test
    public void updateStateWhenStateExistsTest() {
        State existingState = new State();
        existingState.setId(id);
        existingState.setName("old name");
        existingState.setDescription("old description");
        existingState.setProjectId(1L);

        StateRequestDTO stateRequest = new StateRequestDTO();
        stateRequest.setName("new name");
        stateRequest.setDescription("new description");

        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.of(existingState));

        StateResponseDTO updatedState = stateService.updateState(id, stateRequest);

        Mockito.verify(stateRepository, Mockito.times(1)).save(existingState);

        Assertions.assertThat(updatedState)
                .hasFieldOrPropertyWithValue("name", "new name")
                .hasFieldOrPropertyWithValue("description", "new description")
                .hasFieldOrPropertyWithValue("projectId", 1L);

        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);

        Mockito.verifyNoMoreInteractions(stateRepository);
    }

    @Test
    public void updateStateWhenStateDoesNotExistTest() {
        Long id = 1L;
        StateRequestDTO stateRequest = new StateRequestDTO();
        stateRequest.setName("new name");
        stateRequest.setDescription("new description");

        Mockito.when(stateRepository.findById(id)).thenReturn(Optional.empty());

        Assertions.assertThatThrownBy(() -> stateService.updateState(id, stateRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("State with id " + id + " not found");

        Mockito.verify(stateRepository, Mockito.times(1)).findById(id);

        // Verify no other interactions with the repository
        Mockito.verifyNoMoreInteractions(stateRepository);
    }




}
