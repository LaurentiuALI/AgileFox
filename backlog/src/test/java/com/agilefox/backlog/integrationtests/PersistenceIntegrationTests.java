package com.agilefox.backlog.integrationtests;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.TypeRequestDTO;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.agilefox.backlog.service.BacklogItemService;
import com.agilefox.backlog.service.StateService;
import com.agilefox.backlog.service.TypeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("component-test")
public class PersistanceIntegrationTests {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14-alpine");

    @Autowired
    MockMvc mockMvc;

    @Autowired
    BacklogItemService backlogItemService;

    @Autowired
    StateService stateService;

    @Autowired
    TypeService typeService;

    @MockBean
    ProjectClient projectClient;

    @BeforeEach
    void preparation(){
        Mockito.when(projectClient.projectExist(1L)).thenReturn(true);

        StateRequestDTO state = new StateRequestDTO(1L, "open", "this is an open issue", 1L);
        TypeRequestDTO type   = new  TypeRequestDTO(1L, "story", 1L);

        stateService.addState(state);
        typeService.addType(type);

    }

    @AfterEach
    void cleanup(){
        stateService.deleteStateById(1L);
        typeService.deleteType(1L);
    }

    @Test
    void connectionEstablished(){
        assertThat(postgres.isCreated()).isTrue();
        assertThat(postgres.isRunning()).isTrue();
    }

    @Test
    void shouldGetStateByName() throws Exception {
       String backlogItemPayload = """
               {
                       "uid": "TT-1",
                       "projectId": 1,
                       "typeId": 1,
                       "stateId": 1,
                       "title": "Testing items",
                       "description": "this is a creation for testing the items"
               }
               """;

       mockMvc.perform(MockMvcRequestBuilders
               .post("/api/backlogitem")
               .contentType("application/json")
               .accept("application/json")
               .content(backlogItemPayload))
               .andExpect(status().isCreated());

       List<BacklogItemResponseDTO> backlogItems = backlogItemService.getAllBacklogItems();
       assertThat(backlogItems.size()).isEqualTo(1);

       backlogItemService.deleteBacklogItem(1L);
       backlogItems = backlogItemService.getAllBacklogItems();
       assertThat(backlogItems.size()).isEqualTo(0);
    }
}
