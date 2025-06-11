package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.BacklogItem.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.Type.TypeResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.Score.ScoreResponseDTO;
import com.agilefox.backlog.dto.Project.ProjectResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.model.BacklogItem;
import com.agilefox.backlog.model.Card;
import com.agilefox.backlog.model.CheckItem;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.CardRepository;
import com.agilefox.backlog.repository.CheckItemRepository;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.BacklogItemService;
import com.agilefox.backlog.service.CardService;
import com.agilefox.backlog.service.StateService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class BacklogItemServiceImpl implements BacklogItemService {

    private final BacklogItemRepository backlogItemRepository;
    private final StateRepository stateRepository;
    private final TypeRepository typeRepository;
    private final CardRepository cardRepository;
    private final CardService cardService;
    private final ProjectClient projectClient;
    private final CheckItemRepository checkItemRepository;
    private final ModelMapper modelMapper;
    private final StateService stateService;

    @Override
    public List<BacklogItemResponseDTO> getBacklogItems(Long projectId, Long id, String username) {
        log.info("Querying for backlog items for project {}", projectId);
        log.info("Username {}", username);

        List<BacklogItem> backlogItems = backlogItemRepository.findAll()
                .stream()
                .filter(item -> projectId == null || projectId.equals(item.getProjectId()))
                .filter(item -> id == null || item.getId() == id)
                .filter(item -> username == null || username.equals(item.getUsername()))
                .toList();

        return backlogItems.stream()
                .map(this::convertToResponseDTO)
                .toList();

    }

    @Override
    public BacklogItemResponseDTO getBacklogItem(Long projectId, Long id) {
        BacklogItem item = backlogItemRepository.findByIdAndProjectId(id, projectId);
        return convertToResponseDTO(item);
    }

    @Override
    public List<BacklogItemResponseDTO> getAllBacklogItemStateTypes(Long projectId) {
        log.info("START - Query for Backlog item state types for projectId: {}", projectId);
        List<BacklogItem> backlogItems = backlogItemRepository.findByProjectId(projectId);

        return backlogItems.stream().map(item -> {
            // Refresh state and type using orElseThrow for better error handling
            State state = stateRepository.findById(item.getState().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("State not found for backlogItem: " + item.getId()));
            Type type = typeRepository.findById(item.getType().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Type not found for backlogItem: " + item.getId()));
            // Optionally update the backlog item (if needed) or pass to DTO converter
            item.setState(state);
            item.setType(type);
            return convertToResponseDTO(item);
        }).collect(Collectors.toList());
    }

    @Override
    public BacklogItemResponseDTO getBacklogItemByProjectAndId(Long projectId, Long backlogItemId) {
        log.info("Querying for Backlog item with projectId: {} and backlogItemId: {}", projectId, backlogItemId);
        // Assuming you add a custom repository method findByProjectIdAndId
        BacklogItem backlogItem = backlogItemRepository.findByProjectIdAndId(projectId, backlogItemId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "BacklogItem with id " + backlogItemId + " not found in project " + projectId));
        return convertToResponseDTO(backlogItem);
    }

    @Override
    public ScoreResponseDTO getBacklogItemScore(long backlogItemId) {
        log.info("START - Query for Backlog item score with id {}", backlogItemId);
        List<Card> cards = cardRepository.findByBacklogitem_Id(backlogItemId);

        int totalScore = 0;
        int actualScore = 0;
        // Ensure you call cardService.getCardScore only once per card
        for (Card card : cards) {
            ScoreResponseDTO score = cardService.getCardScore(card.getId());
            totalScore += score.getTotalScore();
            actualScore += score.getActualScore();
        }
        return new ScoreResponseDTO(totalScore, actualScore);
    }

    @Transactional
    @Override
    public BacklogItemResponseDTO addBacklogItem(BacklogItemRequestDTO requestDTO) {
        log.info("START - Adding backlog item for projectId: {}", requestDTO.getProjectId());

        log.info("Adding backlog item with information: {}", requestDTO);
        // Validate project existence
        ProjectResponseDTO projectResponse = projectClient.getProjectById(requestDTO.getProjectId());
        if (projectResponse == null) {
            log.error("Project with id {} not found", requestDTO.getProjectId());
            throw new ResourceNotFoundException("Project with id " + requestDTO.getProjectId() + " not found");
        }

        // Validate and retrieve type and state using orElseThrow
        Type type = typeRepository.findById(requestDTO.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Type with id " + requestDTO.getTypeId() + " not found"));

        StateResponseDTO stateResponse = stateService.getFirstStateOfType(type.getId());
        State state = stateRepository.findById(stateResponse.getId()).orElseThrow(() -> new ResourceNotFoundException("State with id " + stateResponse.getId() + " not found"));

        // Create and save BacklogItem to generate an ID
        BacklogItem backlogItem = BacklogItem.builder()
                .projectId(requestDTO.getProjectId())
                .type(type)
                .state(state)
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .username(requestDTO.getUsername())
                .build();
        backlogItem = backlogItemRepository.save(backlogItem);

        // Update UID based on project abbreviation and generated ID
        backlogItem.setUid(projectResponse.getAbbrev() + "-" + backlogItem.getId());
        backlogItem = backlogItemRepository.save(backlogItem);

        // Copy template cards (only those not already assigned to a backlog item)
        associateTemplateCards(backlogItem);

        log.info("END - Added backlog item with id {}", backlogItem.getId());
        return convertToResponseDTO(backlogItem);
    }

    private void associateTemplateCards(BacklogItem backlogItem) {
        List<Card> templateCards = cardRepository.findByType_IdAndState_Id(
                        backlogItem.getType().getId(), backlogItem.getState().getId())
                .stream()
                .filter(card -> card.getBacklogitem() == null)
                .toList();

        templateCards.forEach(card -> {
            log.info("Copying card template: {}", card);
            Card newCard = Card.builder()
                    .projectId(card.getProjectId())
                    .type(card.getType())
                    .state(card.getState())
                    .backlogitem(backlogItem)
                    .title(card.getTitle())
                    .purpose(card.getPurpose())
                    .build();
            Card savedCard = cardRepository.save(newCard);
            card.getCheckItemList().forEach(checkItem -> {
                CheckItem newCheckItem = CheckItem.builder()
                        .checked(false)
                        .information(checkItem.getInformation())
                        .card(savedCard)
                        .build();
                checkItemRepository.save(newCheckItem);
            });
        });
    }

    @Override
    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO requestDTO) {
        log.info("START - Updating backlog item with id {}", id);

        BacklogItem backlogItem = backlogItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Backlog item with id " + id + " not found"));

        // Update UID if provided
        if (requestDTO.getUid() != null) {
            backlogItem.setUid(requestDTO.getUid());
        }

        // Update projectId if provided (assuming it can be changed)
        if (requestDTO.getProjectId() > 0) {
            backlogItem.setProjectId(requestDTO.getProjectId());
        }

        // Update type if provided
        if (requestDTO.getTypeId() > 0) {
            Type type = typeRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Type with id " + requestDTO.getTypeId() + " not found"));
            backlogItem.setType(type);
        }

        // Check if state update is needed
        if (requestDTO.getStateId() > 0 && backlogItem.getState().getId() != requestDTO.getStateId()) {
            State state = stateRepository.findById(requestDTO.getStateId())
                    .orElseThrow(() -> new ResourceNotFoundException("State with id " + requestDTO.getStateId() + " not found"));

            backlogItem.setState(state);

            List<Card> associatedCards = cardRepository.findByBacklogitem_Id(backlogItem.getId());
            cardRepository.deleteAll(associatedCards);

            associateTemplateCards(backlogItem);
        }

        // Update title if provided
        if (requestDTO.getTitle() != null) {
            backlogItem.setTitle(requestDTO.getTitle());
        }

        // Update description if provided
        if (requestDTO.getDescription() != null) {
            backlogItem.setDescription(requestDTO.getDescription());
        }

        // Update username if provided
        if (requestDTO.getUsername() != null) {
            backlogItem.setUsername(requestDTO.getUsername());
        }

        backlogItem = backlogItemRepository.save(backlogItem);

        log.info("END - Updated backlog item with id {}", backlogItem.getId());
        return convertToResponseDTO(backlogItem);
    }


    @Override
    public void deleteBacklogItem(Long id) {
        log.info("START - Deleting backlog item with id {}", id);
        BacklogItem backlogItem = backlogItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Backlog item with id " + id + " not found"));
        backlogItemRepository.delete(backlogItem);
        log.info("END - Deleted backlog item with id {}", id);
    }

    private BacklogItemResponseDTO convertToResponseDTO(BacklogItem item) {
        ScoreResponseDTO score = getBacklogItemScore(item.getId());

        return new BacklogItemResponseDTO(
                item.getId(),
                item.getUid(),
                item.getProjectId(),
                modelMapper.map(item.getType(), TypeResponseDTO.class),
                modelMapper.map(item.getState(), StateResponseDTO.class),
                item.getTitle(),
                item.getDescription(),
                item.getUsername(),
                score.getTotalScore(),
                score.getActualScore()
        );
    }
}
