package com.agilefox.backlog.unittests;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.model.BacklogItem;
import com.agilefox.backlog.model.EstimationType;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.impl.BacklogItemServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BacklogItemServiceUnitTest {

//    private static final Long BACKLOG_ITEM_ID = 1L;
//    private static final String BACKLOG_ITEM_UID = "uid1";
//    private static final String TITLE = "Title";
//    private static final String DESCRIPTION = "Description";
//    private static final Long PROJECT_ID = 1L;
//    private static final Long TYPE_ID = 2L;
//    private static final Long STATE_ID = 3L;
//    private static final String TYPE_NAME = "Type Name";
//    private static final String STATE_NAME = "State Name";
//    private static final String STATE_DESCRIPTION = "State Description";
//
//    private static final String UPDATED_UID = "uid2";
//    private static final Long UPDATED_STATE_ID = 4L;
//    private static final String UPDATED_TITLE = "Updated Title";
//    private static final String UPDATED_DESCRIPTION = "Updated Description";
//
//    @InjectMocks
//    private BacklogItemServiceImpl backlogItemService;
//
//    @Mock
//    private BacklogItemRepository backlogItemRepository;
//
//    @Mock
//    private StateRepository stateRepository;
//
//    @Mock
//    private TypeRepository typeRepository;
//
//    @Mock
//    private ProjectClient projectClient;
//
//    @Test
//    void testGetAllBacklogItems() {
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//        when(backlogItemRepository.findAll()).thenReturn(Collections.singletonList(backlogItem));
//
//        var result = backlogItemService.getAllBacklogItems();
//
//        assertEquals(1, result.size());
//        assertEquals(BACKLOG_ITEM_UID, result.getFirst().getUid());
//        verify(backlogItemRepository, times(1)).findAll();
//    }
//
//    @Test
//    void testGetAllBacklogItemStateTypes() {
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//        State state = new State(STATE_ID, STATE_NAME, STATE_DESCRIPTION, PROJECT_ID);
//        Type type = new Type(TYPE_ID, TYPE_NAME, PROJECT_ID);
//
//        when(backlogItemRepository.findByProjectId(PROJECT_ID)).thenReturn(Collections.singletonList(backlogItem));
//        when(stateRepository.findById(STATE_ID)).thenReturn(Optional.of(state));
//        when(typeRepository.findById(TYPE_ID)).thenReturn(Optional.of(type));
//
//        var result = backlogItemService.getAllBacklogItemStateTypes(PROJECT_ID);
//
//        assertEquals(1, result.size());
//        assertEquals(STATE_NAME, result.getFirst().getStateName());
//        assertEquals(TYPE_NAME, result.getFirst().getTypeName());
//        verify(backlogItemRepository, times(1)).findByProjectId(PROJECT_ID);
//        verify(stateRepository, times(1)).findById(STATE_ID);
//        verify(typeRepository, times(1)).findById(TYPE_ID);
//    }
//
//    @Test
//    void testGetAllBacklogItemStateTypes_StateNotFound() {
//        // Arrange
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//
//        when(backlogItemRepository.findByProjectId(PROJECT_ID)).thenReturn(Collections.singletonList(backlogItem));
//        when(stateRepository.findById(STATE_ID)).thenReturn(Optional.empty());
//        when(typeRepository.findById(TYPE_ID)).thenReturn(Optional.of(new Type(TYPE_ID, TYPE_NAME, PROJECT_ID)));
//
//        // Act & Assert
//        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () ->
//                backlogItemService.getAllBacklogItemStateTypes(PROJECT_ID)
//        );
//
//        assertEquals("State or type not found", exception.getMessage());
//
//        verify(backlogItemRepository, times(1)).findByProjectId(PROJECT_ID);
//        verify(stateRepository, times(1)).findById(STATE_ID);
//        verify(typeRepository, times(1)).findById(TYPE_ID);
//    }
//
//    @Test
//    void testGetAllBacklogItemStateTypes_TypeNotFound() {
//        // Arrange
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//
//        when(backlogItemRepository.findByProjectId(PROJECT_ID)).thenReturn(Collections.singletonList(backlogItem));
//        when(stateRepository.findById(STATE_ID)).thenReturn(Optional.of(new State(STATE_ID, STATE_NAME, STATE_DESCRIPTION, PROJECT_ID)));
//        when(typeRepository.findById(TYPE_ID)).thenReturn(Optional.empty());
//
//        // Act & Assert
//        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () ->
//                backlogItemService.getAllBacklogItemStateTypes(PROJECT_ID)
//        );
//
//        assertEquals("State or type not found", exception.getMessage());
//
//        verify(backlogItemRepository, times(1)).findByProjectId(PROJECT_ID);
//        verify(stateRepository, times(1)).findById(STATE_ID);
//        verify(typeRepository, times(1)).findById(TYPE_ID);
//    }
//
//    @Test
//    void testAddBacklogItem_ProjectExists() {
//        BacklogItemRequestDTO requestDTO = new BacklogItemRequestDTO(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//
//        BacklogItem savedBacklogItem = BacklogItem.builder()
//                .id(BACKLOG_ITEM_ID)
//                .uid(BACKLOG_ITEM_UID)
//                .projectId(PROJECT_ID)
//                .typeId(TYPE_ID)
//                .stateId(STATE_ID)
//                .title(TITLE)
//                .description(DESCRIPTION)
//                .build();
//
//        ProjectResponseDTO mockProject = new ProjectResponseDTO(
//                1L,
//                "Test Project",
//                "Description of Test Project",
//                EstimationType.DAYS,
//                "TP"
//        );
//
//        when(projectClient.getProjectById(PROJECT_ID)).thenReturn(mockProject);
//        when(backlogItemRepository.save(any(BacklogItem.class))).thenReturn(savedBacklogItem);
//
//        // Act
//        BacklogItemResponseDTO result = backlogItemService.addBacklogItem(requestDTO);
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(BACKLOG_ITEM_UID, result.getUid());
//        assertEquals(PROJECT_ID, result.getProjectId());
//        assertEquals(TYPE_ID, result.getTypeId());
//        assertEquals(STATE_ID, result.getStateId());
//        assertEquals(TITLE, result.getTitle());
//        assertEquals(DESCRIPTION, result.getDescription());
//
//        verify(projectClient, times(1)).getProjectById(PROJECT_ID);
//        verify(backlogItemRepository, times(1)).save(any(BacklogItem.class));
//    }
//
//    @Test
//    void testAddBacklogItem_ProjectDoesNotExist() {
//        BacklogItemRequestDTO requestDTO = new BacklogItemRequestDTO(BACKLOG_ITEM_ID, UPDATED_UID, PROJECT_ID, TYPE_ID, UPDATED_STATE_ID, UPDATED_TITLE, UPDATED_DESCRIPTION);
//
//        when(projectClient.getProjectById(PROJECT_ID)).thenReturn(null);
//
//        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () ->
//                backlogItemService.addBacklogItem(requestDTO)
//        );
//
//        assertEquals("Project with id " + PROJECT_ID + " not found", exception.getMessage());
//
//        verify(projectClient, times(1)).getProjectById(PROJECT_ID);
//        verify(backlogItemRepository, never()).save(any(BacklogItem.class));
//    }
//
//    @Test
//    void testUpdateBacklogItem() {
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//        BacklogItemRequestDTO requestDTO = new BacklogItemRequestDTO(BACKLOG_ITEM_ID, UPDATED_UID, PROJECT_ID, TYPE_ID, UPDATED_STATE_ID, UPDATED_TITLE, UPDATED_DESCRIPTION);
//
//        when(backlogItemRepository.findById(BACKLOG_ITEM_ID)).thenReturn(Optional.of(backlogItem));
//
//        var result = backlogItemService.updateBacklogItem(BACKLOG_ITEM_ID, requestDTO);
//
//        assertNotNull(result);
//        assertEquals(UPDATED_UID, result.getUid());
//        assertEquals(UPDATED_TITLE, result.getTitle());
//        verify(backlogItemRepository, times(1)).save(any(BacklogItem.class));
//    }
//
//    @Test
//    void testUpdateBacklogItemNotFound() {
//        BacklogItemRequestDTO requestDTO = new BacklogItemRequestDTO(BACKLOG_ITEM_ID, UPDATED_UID, PROJECT_ID, TYPE_ID, UPDATED_STATE_ID, UPDATED_TITLE, UPDATED_DESCRIPTION);
//        when(backlogItemRepository.findById(BACKLOG_ITEM_ID)).thenReturn(Optional.empty());
//
//
//        Assertions.assertThatThrownBy(() -> backlogItemService.updateBacklogItem(BACKLOG_ITEM_ID, requestDTO))
//                .isInstanceOf(ResourceNotFoundException.class)
//                .hasMessage("Project with id 1 not found");
//
//        verify(backlogItemRepository, never()).save(any(BacklogItem.class));
//    }
//
//    @Test
//    void testDeleteBacklogItem() {
//        BacklogItem backlogItem = new BacklogItem(BACKLOG_ITEM_ID, BACKLOG_ITEM_UID, PROJECT_ID, TYPE_ID, STATE_ID, TITLE, DESCRIPTION);
//        when(backlogItemRepository.findById(BACKLOG_ITEM_ID)).thenReturn(Optional.of(backlogItem));
//
//        backlogItemService.deleteBacklogItem(BACKLOG_ITEM_ID);
//
//        verify(backlogItemRepository, times(1)).delete(backlogItem);
//    }
//
//    @Test
//    void testDeleteBacklogItemNotFound() {
//        when(backlogItemRepository.findById(BACKLOG_ITEM_ID)).thenReturn(Optional.empty());
//
//        Assertions.assertThatThrownBy(() -> backlogItemService.deleteBacklogItem(BACKLOG_ITEM_ID))
//                        .isInstanceOf(ResourceNotFoundException.class)
//                                .hasMessage("Project with id 1 not found");
//
//        verify(backlogItemRepository, never()).delete(any(BacklogItem.class));
//    }
}
