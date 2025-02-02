package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.*;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.model.*;
import com.agilefox.backlog.repository.*;
import com.agilefox.backlog.service.BacklogItemService;
import com.agilefox.backlog.service.CardService;
import jakarta.transaction.Transactional;
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
    private final CardRepository cardRepository;
    private final CardService cardService;
    private final ProjectClient projectClient;
    private final CheckItemRepository checkItemRepository;

    @Override
    public List<BacklogItemResponseDTO> getAllBacklogItems() {
        log.info("Query for Backlog items");
        return backlogItemRepository.findAll().stream()
                .map(backlogItem -> new BacklogItemResponseDTO(
                        backlogItem.getId(),
                        backlogItem.getUid(),
                        backlogItem.getProjectId(),
                        backlogItem.getType(),
                        backlogItem.getState(),
                        backlogItem.getTitle(),
                        backlogItem.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public List<BacklogItemResponseDTO> getAllBacklogItemStateTypes(Long projectId) {
        log.info("START - Query for Backlog item state types");
        List<BacklogItem> backlogItems = backlogItemRepository.findByProjectId(projectId);
        List<BacklogItemResponseDTO> backlogItemStateTypes = new ArrayList<>();

        for (BacklogItem backlogItem : backlogItems) {
            State state = stateRepository.findById(backlogItem.getState().getId()).orElse(null);
            Type type = typeRepository.findById(backlogItem.getType().getId()).orElse(null);

            if (state != null && type != null) {
                backlogItemStateTypes.add(new BacklogItemResponseDTO(
                        backlogItem.getId(),
                        backlogItem.getUid(),
                        backlogItem.getProjectId(),
                        type,
                        state,
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
    public BacklogItemResponseDTO getBacklogItemByProjectAndId(Long projectId, Long backlogItemId) {
        log.info("START - Query for Backlog item state types");
        List<BacklogItem> backlogItems = backlogItemRepository.findByProjectId(projectId);
        for(BacklogItem backlogItem: backlogItems) {
            if (backlogItem.getId() == backlogItemId) {
                State state = stateRepository.findById(backlogItem.getState().getId()).orElse(null);
                Type type = typeRepository.findById(backlogItem.getType().getId()).orElse(null);

                if (state != null && type != null) {
                    return new BacklogItemResponseDTO(backlogItemId, backlogItem.getUid(), projectId, type, state, backlogItem.getTitle(), backlogItem.getDescription());
                } else {
                    log.error("State or type not found for backlogItem: {}", backlogItem);
                    throw new ResourceNotFoundException("State or type not found");
                }
            }
        }
        log.error(" backlogItem with id {} not found", backlogItemId);
        throw new ResourceNotFoundException("backlogItem with id " + backlogItemId + " not found");
    }

    @Override
    public ScoreResponseDTO getBacklogItemScore(long backlogItemId) {
        log.info("START - Query for Backlog item with id {}", backlogItemId);
        BacklogItem backlogItem = backlogItemRepository.findById(backlogItemId).orElseThrow( () -> new ResourceNotFoundException("BacklogItem not found"));

        List<Card> cardsOfBacklogItem = cardRepository.findByType_IdAndState_Id(backlogItem.getType().getId(), backlogItem.getState().getId());

        int totalScore = 0;
        int actualScore = 0;

        for (Card card : cardsOfBacklogItem) {
            ScoreResponseDTO scoreResponseDTO = cardService.getCardScore(card.getId());
            totalScore += scoreResponseDTO.getTotalScore();
            actualScore += scoreResponseDTO.getActualScore();
        }

        return new ScoreResponseDTO(totalScore, actualScore);
    }

    @Transactional
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

        Type type = typeRepository.findById(backlogItemRequest.getTypeId()).orElse(null);
        if (type == null) {
            log.error("Type with id {} not found", backlogItemRequest.getTypeId());
            throw new ResourceNotFoundException("Type with id " + backlogItemRequest.getTypeId() + " not found");
        }

        State state = stateRepository.findById(backlogItemRequest.getStateId()).orElse(null);
        if (state == null) {
            log.error("State with id {} not found", backlogItemRequest.getStateId());
            throw new ResourceNotFoundException("State with id " + backlogItemRequest.getStateId() + " not found");
        }

        BacklogItem backlogItem = BacklogItem.builder()
                .projectId(backlogItemRequest.getProjectId())
                .type(type)
                .state(state)
                .title(backlogItemRequest.getTitle())
                .description(backlogItemRequest.getDescription())
                .build();

        backlogItemRepository.save(backlogItem);

        backlogItem.setUid(projectResponse.getAbbrev() + "-" + backlogItem.getId());
        backlogItemRepository.save(backlogItem);

        List<Card> templateCards = cardRepository.findByType_IdAndState_Id(backlogItem.getType().getId(), backlogItem.getState().getId()).stream().filter( card -> card.getBacklogitem() == null).toList();

        for (Card card : templateCards) {
            log.info("START making copy for card {}", card);

            Card newCard = Card.builder()
                    .projectId(card.getProjectId())
                    .type(card.getType())
                    .state(card.getState())
                    .backlogitem(backlogItem)
                    .title(card.getTitle())
                    .purpose(card.getPurpose())
                    .build();
            log.info("END making copy for card {}", card);
            log.info("copy for card is {}", newCard);
            cardRepository.save(newCard);

            log.info("checkitems are {}", card.getCheckItemList());
            for(CheckItem checkitem: card.getCheckItemList()){
                CheckItem newCheckItem = CheckItem.builder()
                        .checked(false)
                        .information(checkitem.getInformation())
                        .card(newCard)
                        .build();
                checkItemRepository.save(newCheckItem);
            }

            log.info("END saving copy for card {}", newCard);
        }



        log.info("END - Adding backlog item {}", backlogItemRequest);
        return new BacklogItemResponseDTO(
                backlogItem.getId(),
                backlogItem.getUid(),
                backlogItem.getProjectId(),
                backlogItem.getType(),
                backlogItem.getState(),
                backlogItem.getTitle(),
                backlogItem.getDescription());
    }

    @Override
    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO backlogItemRequestDTO) {
        log.info("START - Updating backlog item with id {}", id);

        BacklogItem backlogItem = backlogItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Backlog item with id " + id + " not found"));

        Type type = typeRepository.findById(backlogItemRequestDTO.getTypeId()).orElse(null);
        if (type == null) {
            log.error("Type with id {} not found", backlogItemRequestDTO.getTypeId());
            throw new ResourceNotFoundException("Type with id " + backlogItemRequestDTO.getTypeId() + " not found");
        }

        State state = stateRepository.findById(backlogItemRequestDTO.getStateId()).orElse(null);
        if (state == null) {
            log.error("State with id {} not found", backlogItemRequestDTO.getStateId());
            throw new ResourceNotFoundException("State with id " + backlogItemRequestDTO.getStateId() + " not found");
        }

        backlogItem.setUid(backlogItemRequestDTO.getUid());
        backlogItem.setProjectId(backlogItemRequestDTO.getProjectId());
        backlogItem.setType(type);
        backlogItem.setState(state);
        backlogItem.setTitle(backlogItemRequestDTO.getTitle());
        backlogItem.setDescription(backlogItemRequestDTO.getDescription());

        backlogItemRepository.save(backlogItem);
        log.info("END - Updating backlog item {}", backlogItem);
        return new BacklogItemResponseDTO(
                backlogItem.getId(),
                backlogItem.getUid(),
                backlogItem.getProjectId(),
                backlogItem.getType(),
                backlogItem.getState(),
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
