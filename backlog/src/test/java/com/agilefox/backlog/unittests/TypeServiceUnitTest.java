package com.agilefox.backlog.unittests;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.dto.TypeResponseDTO;
import com.agilefox.backlog.model.EstimationType;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.impl.TypeServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class TypeServiceUnitTest {

    private static final Long id = 1L;
    private static final Long projectId = 1L;
    private static final String typeName = "Story";

    private static Type defaultType;

    @Mock
    private TypeRepository typeRepository;

    @Mock
    private ProjectClient projectClient;

    @InjectMocks
    private TypeServiceImpl typeService;

    @BeforeAll
    public static void setUp() {
        defaultType = new Type();
        defaultType.setId(id);
        defaultType.setName(typeName);
        defaultType.setProjectId(projectId);
    }

    // GET ALL TYPES
    @Test
    public void getTypesWhenNotEmptyTest() {
        Mockito.when(typeRepository.findAll()).thenReturn(Collections.singletonList(defaultType));

        List<TypeResponseDTO> result = typeService.getTypes();

        Assertions.assertThat(result)
                .isNotNull()
                .isNotEmpty()
                .hasSize(1);

        TypeResponseDTO response = result.getFirst();
        Assertions.assertThat(response)
                .hasFieldOrPropertyWithValue("id", id)
                .hasFieldOrPropertyWithValue("name", typeName)
                .hasFieldOrPropertyWithValue("projectId", projectId);

        Mockito.verify(typeRepository, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(typeRepository);
    }

    @Test
    public void getTypesWhenEmptyTest() {
        Mockito.when(typeRepository.findAll()).thenReturn(Collections.emptyList());

        List<TypeResponseDTO> result = typeService.getTypes();

        Assertions.assertThat(result)
                .isNotNull()
                .isEmpty();

        Mockito.verify(typeRepository, Mockito.times(1)).findAll();
        Mockito.verifyNoMoreInteractions(typeRepository);
    }

    // ADD TYPE
    @Test
    public void addTypeWhenProjectExistsTest() {
        ProjectResponseDTO mockProject = new ProjectResponseDTO(
                1L,
                "Test Project",
                "Description of Test Project",
                EstimationType.DAYS,
                "TP"
        );
        Mockito.when(projectClient.getProjectById(projectId)).thenReturn(mockProject);
        Mockito.when(typeRepository.save(Mockito.any(Type.class))).thenReturn(defaultType);

        TypeRequestDTO request = new TypeRequestDTO(id, typeName, projectId);
        TypeResponseDTO response = typeService.addType(request);

        Assertions.assertThat(response)
                .isNotNull()
                .hasFieldOrPropertyWithValue("name", typeName)
                .hasFieldOrPropertyWithValue("projectId", projectId);

        Mockito.verify(projectClient, Mockito.times(1)).getProjectById(projectId);
        Mockito.verify(typeRepository, Mockito.times(1)).save(Mockito.any(Type.class));
        Mockito.verifyNoMoreInteractions(projectClient, typeRepository);
    }

    @Test
    public void addTypeWhenProjectDoesNotExistTest() {
        Mockito.when(projectClient.getProjectById(projectId)).thenReturn(null);

        TypeRequestDTO request = new TypeRequestDTO(id, typeName, projectId);
        TypeResponseDTO response = typeService.addType(request);

        Assertions.assertThat(response).isNull();

        Mockito.verify(projectClient, Mockito.times(1)).getProjectById(projectId);
        Mockito.verifyNoInteractions(typeRepository);
    }

    // UPDATE TYPE
    @Test
    public void updateTypeWhenTypeExistsTest() {
        Type existingType = new Type();
        existingType.setId(id);
        existingType.setName("Old Name");
        existingType.setProjectId(projectId);

        Mockito.when(typeRepository.findById(id)).thenReturn(Optional.of(existingType));

        TypeRequestDTO request = new TypeRequestDTO(id, "Updated Name", projectId);
        TypeResponseDTO response = typeService.updateState(id, request);

        Assertions.assertThat(response)
                .isNotNull()
                .hasFieldOrPropertyWithValue("id", id)
                .hasFieldOrPropertyWithValue("name", "Updated Name")
                .hasFieldOrPropertyWithValue("projectId", projectId);

        Mockito.verify(typeRepository, Mockito.times(1)).findById(id);
        Mockito.verify(typeRepository, Mockito.times(1)).save(existingType);
        Mockito.verifyNoMoreInteractions(typeRepository);
    }

    @Test
    public void updateTypeWhenTypeDoesNotExistTest() {
        Mockito.when(typeRepository.findById(id)).thenReturn(Optional.empty());

        TypeRequestDTO request = new TypeRequestDTO(id, "Updated Name", projectId);
        TypeResponseDTO response = typeService.updateState(id, request);

        Assertions.assertThat(response).isNull();

        Mockito.verify(typeRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(typeRepository);
    }

    // DELETE TYPE
    @Test
    public void deleteTypeWhenExistsTest() {
        Mockito.when(typeRepository.findById(id)).thenReturn(Optional.of(defaultType));

        typeService.deleteType(id);

        Mockito.verify(typeRepository, Mockito.times(1)).findById(id);
        Mockito.verify(typeRepository, Mockito.times(1)).delete(defaultType);
        Mockito.verifyNoMoreInteractions(typeRepository);
    }

    @Test
    public void deleteTypeWhenNotExistsTest() {
        Mockito.when(typeRepository.findById(id)).thenReturn(Optional.empty());

        typeService.deleteType(id);

        Mockito.verify(typeRepository, Mockito.times(1)).findById(id);
        Mockito.verifyNoMoreInteractions(typeRepository);
    }
}
