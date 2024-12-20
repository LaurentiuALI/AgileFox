package com.agilefox.backlog.unittests;


import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.controller.StateController;
import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.StateResponseDTO;
import com.agilefox.backlog.service.impl.StateServiceImpl;
import com.google.common.net.MediaType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(StateController.class)
public class StateControllerUnitTest {

    private static final String stateName = "open";
    private static final String stateDescription = "This shows that the item is still open";
    private static final Long projectId = 1L;
    private static final Long id = 1L;

    private static StateResponseDTO defaultState;

    @MockBean
    private StateServiceImpl stateService;

    @MockBean
    private ProjectClient projectClient;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    public static void setUp() {
        defaultState = new StateResponseDTO();
        defaultState.setName(stateName);
        defaultState.setDescription(stateDescription);
        defaultState.setProjectId(projectId);
        defaultState.setId(id);
    }

    @Test
    public void getStatesEndpoint() throws Exception {
        List<StateResponseDTO> states = Collections.singletonList(defaultState);

        Mockito.when(stateService.getStates())
                .thenReturn(states);

        final String link = "/api/state";

        this.mockMvc.perform(MockMvcRequestBuilders
                        .get(link)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isFound())
                .andExpect(jsonPath("$", hasSize(states.size())));
    }

    @Test
    public void getStateByIdEndpoint() throws Exception {
        Mockito.when(stateService.getStatesOfProject(id))
                .thenReturn(List.of(defaultState));

        final String link = "/api/state/" + id;

        this.mockMvc.perform(MockMvcRequestBuilders
                        .get(link)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isFound())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(stateName))
                .andExpect(jsonPath("$.description").value(stateDescription))
                .andExpect(jsonPath("$.projectId").value(projectId));
    }

    @Test
    public void deleteStateByIdEndpoint() throws Exception {
        final String link = "/api/state/" + id;

        this.mockMvc.perform(MockMvcRequestBuilders
                        .delete(link))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void createStateEndpoint() throws Exception {
        StateRequestDTO stateRequest = new StateRequestDTO();
        stateRequest.setName(stateName);
        stateRequest.setDescription(stateDescription);
        stateRequest.setProjectId(projectId);

        Mockito.when(stateService.addState(Mockito.any(StateRequestDTO.class)))
                .thenReturn(defaultState);

        final String link = "/api/state";

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post(link)
                        .contentType("application/json")
                        .content("""
                            {
                                "name": "open",
                                "description": "This shows that the item is still open",
                                "projectId": 1
                            }
                            """))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(stateName))
                .andExpect(jsonPath("$.description").value(stateDescription))
                .andExpect(jsonPath("$.projectId").value(projectId));
    }



}
