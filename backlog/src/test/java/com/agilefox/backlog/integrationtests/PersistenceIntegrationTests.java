package com.agilefox.backlog.integrationtests;

import com.agilefox.backlog.KeycloakTestUtils;
import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import com.agilefox.backlog.dto.StateRequestDTO;
import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.model.EstimationType;
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
import dasniko.testcontainers.keycloak.KeycloakContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("component-test")
public class PersistenceIntegrationTests {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14-alpine");

    @Container
    KeycloakContainer keycloak = new KeycloakContainer("quay.io/keycloak/keycloak:22.0.1")
            .withExposedPorts(9000)
            .withEnv("KEYCLOAK_ADMIN", "admin")
            .withEnv("KEYCLOAK_ADMIN_PASSWORD", "admin")
            .withRealmImportFile("/keycloak/realm-export.json");

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

    private String accessToken;

    @BeforeEach
    void preparation() {
        // Obtain a valid access token
        accessToken = KeycloakTestUtils.obtainAccessToken(
                keycloak.getAuthServerUrl(),
                "test-realm",
                "test-client",
                "test-user",
                "test-password"
        );

        // Mocking the response of projectExist
        ProjectResponseDTO mockProject = new ProjectResponseDTO(
                1L,
                "Test Project",
                "Description of Test Project",
                EstimationType.DAYS,
                "TP"
        );
        Mockito.when(projectClient.getProjectById(1L)).thenReturn(mockProject);

        // Create mock state and type
        StateRequestDTO state = new StateRequestDTO(1L, "open", "this is an open issue", 1L);
        TypeRequestDTO type = new TypeRequestDTO(1L, "story", 1L);

        stateService.addState(state);
        typeService.addType(type);
    }

    @AfterEach
    void cleanup() {
        stateService.deleteStateById(1L);
        typeService.deleteType(1L);
    }

    @Test
    void connectionEstablished() {
        assertThat(postgres.isCreated()).isTrue();
        assertThat(postgres.isRunning()).isTrue();
        assertThat(keycloak.isRunning()).isTrue();
    }

    @Test
    void shouldCreateBacklogItem() throws Exception {
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
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType("application/json")
                        .accept("application/json")
                        .content(backlogItemPayload))
                .andExpect(status().isCreated());

        // Validate creation
        List<BacklogItemResponseDTO> backlogItems = backlogItemService.getAllBacklogItems();
        assertThat(backlogItems.size()).isEqualTo(1);

        // Cleanup
        backlogItemService.deleteBacklogItem(1L);
        backlogItems = backlogItemService.getAllBacklogItems();
        assertThat(backlogItems.size()).isEqualTo(0);
    }

    @Test
    void shouldFailWithoutAuthorization() throws Exception {
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
                .andExpect(status().isUnauthorized());
    }
}
