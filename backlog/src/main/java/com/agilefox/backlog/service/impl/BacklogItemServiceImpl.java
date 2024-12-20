package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItemStateTypeResponseDTO;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.model.BacklogItem;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.BacklogItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class BacklogItemServiceImpl implements BacklogItemService {

    private final BacklogItemRepository backlogItemRepository;
    private final StateRepository stateRepository;
    private final TypeRepository typeRepository;
    private final ProjectClient projectClient;

    @Override
    public List<BacklogItemResponseDTO> getAllBacklogItems() {
        log.info("Query for Backlog items");
        return backlogItemRepository.findAll().stream()
                .map(backlogItem -> new BacklogItemResponseDTO(
                        backlogItem.getId(),
                        backlogItem.getUid(),
                        backlogItem.getProjectId(),
                        backlogItem.getTypeId(),
                        backlogItem.getStateId(),
                        backlogItem.getTitle(),
                        backlogItem.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public List<BacklogItemStateTypeResponseDTO> getAllBacklogItemStateTypes(Long projectId) {
        log.info("START - Query for Backlog item state types");
        List<BacklogItem> backlogItems = backlogItemRepository.findByProjectId(projectId);
        List<BacklogItemStateTypeResponseDTO> backlogItemStateTypes = new ArrayList<>();

        for (BacklogItem backlogItem : backlogItems) {
            State state = stateRepository.findById(backlogItem.getStateId()).orElse(null);
            Type type = typeRepository.findById(backlogItem.getTypeId()).orElse(null);

            if (state != null && type != null) {
                backlogItemStateTypes.add(new BacklogItemStateTypeResponseDTO(
                        backlogItem.getId(),
                        backlogItem.getUid(),
                        backlogItem.getProjectId(),
                        type.getName(),
                        state.getName(),
                        backlogItem.getTitle(),
                        backlogItem.getDescription()));
            } else {
                log.error("State or type not found for backlogItem: {}", backlogItem);
                throw new ResourceNotFoundException("State or type not found");
            }
        }
        log.info("END - Query for Backlog item state types");
        return backlogItemStateTypes;
    }

    @Override
    public BacklogItemResponseDTO addBacklogItem(BacklogItemRequestDTO backlogItemRequest) {
        log.info("START - Adding backlog item");
        log.info("Querying for project existence with id {}", backlogItemRequest.getProjectId());
        ProjectResponseDTO projectResponse;
        try{

            projectResponse = projectClient.getProjectById(backlogItemRequest.getProjectId());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
        if (projectResponse == null) {
            log.error("Project with id {} not found", backlogItemRequest.getProjectId());
            throw new ResourceNotFoundException("Project with id " + backlogItemRequest.getProjectId() + " not found");
        }

        BacklogItem backlogItem = BacklogItem.builder()
//                .uid(backlogItemRequest.getUid())
                .projectId(backlogItemRequest.getProjectId())
                .typeId(backlogItemRequest.getTypeId())
                .stateId(backlogItemRequest.getStateId())
                .title(backlogItemRequest.getTitle())
                .description(backlogItemRequest.getDescription())
                .build();

        backlogItemRepository.save(backlogItem);

        if(backlogItemRepository.findById(backlogItem.getId()).isPresent()){
            backlogItem.setUid(projectResponse.getAbbrev() + "-" + backlogItem.getId());
            backlogItemRepository.save(backlogItem);
        } else {
            throw new ResourceNotFoundException("Error while adding UUID to backlog item: " + backlogItem);
        }

        log.info("END - Adding backlog item {}", backlogItemRequest);
        return new BacklogItemResponseDTO(
                backlogItem.getId(),
                backlogItem.getUid(),
                backlogItem.getProjectId(),
                backlogItem.getTypeId(),
                backlogItem.getStateId(),
                backlogItem.getTitle(),
                backlogItem.getDescription());
    }

    @Override
    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO backlogItemRequestDTO) {
        log.info("START - Updating backlog item with id {}", id);

        BacklogItem backlogItem = backlogItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Backlog item with id " + id + " not found"));

        backlogItem.setUid(backlogItemRequestDTO.getUid());
        backlogItem.setProjectId(backlogItemRequestDTO.getProjectId());
        backlogItem.setTypeId(backlogItemRequestDTO.getTypeId());
        backlogItem.setStateId(backlogItemRequestDTO.getStateId());
        backlogItem.setTitle(backlogItemRequestDTO.getTitle());
        backlogItem.setDescription(backlogItemRequestDTO.getDescription());

        backlogItemRepository.save(backlogItem);
        log.info("END - Updating backlog item {}", backlogItem);
        return new BacklogItemResponseDTO(
                backlogItem.getId(),
                backlogItem.getUid(),
                backlogItem.getProjectId(),
                backlogItem.getTypeId(),
                backlogItem.getStateId(),
                backlogItem.getTitle(),
                backlogItem.getDescription());
    }

    @Override
    public void deleteBacklogItem(Long id) {
        log.info("START - Deleting backlog item with id {}", id);
        BacklogItem backlogItem = backlogItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Backlog item with id " + id + " not found"));

        backlogItemRepository.delete(backlogItem);
        log.info("END - Deleting backlog item {}", id);
    }
}
