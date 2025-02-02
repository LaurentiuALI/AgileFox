package com.agilefox.backlog.unittests;

import com.agilefox.backlog.controller.BacklogItemController;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(SpringExtension.class)
@WebMvcTest(BacklogItemController.class)
public class BacklogItemControllerUnitTest {
//
//    private static final Long projectId = 1L;
//    private static final Long typeId = 2L;
//    private static final Long stateId = 3L;
//    private static final String backlogItemTitle = "Sample Backlog Item";
//    private static final String backlogItemDescription = "Sample Description";
//    private static final Long backlogItemId = 1L;
//    private static final String backlogItemUid = "unique-uid";
//
//    private static BacklogItemStateTypeResponseDTO defaultBacklogItemStateType;
//    private static BacklogItemResponseDTO defaultBacklogItemResponse;
//
//    @MockBean
//    private BacklogItemService backlogItemService;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @BeforeAll
//    public static void setUp() {
//        defaultBacklogItemStateType = new BacklogItemStateTypeResponseDTO();
//        defaultBacklogItemStateType.setId(backlogItemId);
//        defaultBacklogItemStateType.setTitle(backlogItemTitle);
//        defaultBacklogItemStateType.setDescription(backlogItemDescription);
//
//        defaultBacklogItemResponse = new BacklogItemResponseDTO();
//        defaultBacklogItemResponse.setId(backlogItemId);
//        defaultBacklogItemResponse.setUid(backlogItemUid);
//        defaultBacklogItemResponse.setProjectId(projectId);
//        defaultBacklogItemResponse.setTypeId(typeId);
//        defaultBacklogItemResponse.setStateId(stateId);
//        defaultBacklogItemResponse.setTitle(backlogItemTitle);
//        defaultBacklogItemResponse.setDescription(backlogItemDescription);
//    }
//
//    @Test
//    public void getBacklogItemsByProjectIdEndpoint() throws Exception {
//        List<BacklogItemStateTypeResponseDTO> backlogItems = Collections.singletonList(defaultBacklogItemStateType);
//
//        Mockito.when(backlogItemService.getAllBacklogItemStateTypes(projectId))
//                .thenReturn(backlogItems);
//
//        final String link = "/api/backlogitem?projectId=" + projectId;
//
//        this.mockMvc.perform(MockMvcRequestBuilders
//                        .get(link)
//                        .accept("application/json"))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(backlogItems.size())));
//    }
//
//    @Test
//    public void createBacklogItemEndpoint() throws Exception {
//        Mockito.when(backlogItemService.addBacklogItem(Mockito.any(BacklogItemRequestDTO.class)))
//                .thenReturn(defaultBacklogItemResponse);
//
//        final String link = "/api/backlogitem";
//
//        this.mockMvc.perform(MockMvcRequestBuilders
//                        .post(link)
//                        .contentType("application/json")
//                        .content("""
//                                {
//                                    "id": 1,
//                                    "uid": "unique-uid",
//                                    "projectId": 1,
//                                    "typeId": 2,
//                                    "stateId": 3,
//                                    "title": "Sample Backlog Item",
//                                    "description": "Sample Description"
//                                }
//                                """))
//                .andDo(print())
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.id").value(backlogItemId))
//                .andExpect(jsonPath("$.uid").value(backlogItemUid))
//                .andExpect(jsonPath("$.projectId").value(projectId))
//                .andExpect(jsonPath("$.typeId").value(typeId))
//                .andExpect(jsonPath("$.stateId").value(stateId))
//                .andExpect(jsonPath("$.title").value(backlogItemTitle))
//                .andExpect(jsonPath("$.description").value(backlogItemDescription));
//    }
}
