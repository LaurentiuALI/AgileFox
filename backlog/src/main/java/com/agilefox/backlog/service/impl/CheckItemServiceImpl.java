package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.dto.BacklogItem.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.CheckItemRequestDTO;
import com.agilefox.backlog.dto.Card.CheckItem.CheckItemResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.Score.ScoreResponseDTO;
import com.agilefox.backlog.model.BacklogItem;
import com.agilefox.backlog.model.Card;
import com.agilefox.backlog.model.CheckItem;
import com.agilefox.backlog.repository.BacklogItemRepository;
import com.agilefox.backlog.repository.CardRepository;
import com.agilefox.backlog.repository.CheckItemRepository;
import com.agilefox.backlog.service.BacklogItemService;
import com.agilefox.backlog.service.CardService;
import com.agilefox.backlog.service.CheckItemService;
import com.agilefox.backlog.service.StateService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CheckItemServiceImpl implements CheckItemService {

    private final CheckItemRepository checkItemRepository;
    private final CardRepository cardRepository;
    private final CardService cardService;
    private final StateService stateService;
    private final BacklogItemRepository backlogItemRepository;
    private final BacklogItemService backlogItemService;
    private final ModelMapper modelMapper;

    @Override
    public List<CheckItemResponseDTO> getAllCheckItems() {
        log.info("Fetching all check items");
        List<CheckItemResponseDTO> checkItems = ((List<CheckItem>) checkItemRepository.findAll()).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        log.info("Found {} check items", checkItems.size());
        return checkItems;
    }

    @Override
    public List<CheckItemResponseDTO> getCheckItemsOfCard(long cardId) {
        log.info("Fetching check items for card with ID: {}", cardId);
//        List<CheckItemResponseDTO> checkItems = ((List<CheckItem>) checkItemRepository.findAll()).stream()
//                .filter(checkItem -> checkItem.getCard().getId() == cardId)
//                .map(this::convertToResponseDTO)
//                .collect(Collectors.toList());
        List<CheckItemResponseDTO> checkItems = checkItemRepository.findCheckItemsByCardId(cardId).stream().map(this::convertToResponseDTO).collect(Collectors.toList());
        log.info("Found {} check items for card ID: {}", checkItems.size(), cardId);
        return checkItems;
    }

    @Override
    public CheckItemResponseDTO getCheckItemById(long checkItemId) {
        log.info("Fetching check item with ID: {}", checkItemId);
        CheckItem checkItem = checkItemRepository.findById(checkItemId).orElseThrow(() -> {
            log.error("Check item with ID: {} not found", checkItemId);
            return new RuntimeException("Check item not found");
        });
        log.info("Check item with ID: {} found", checkItemId);
        return convertToResponseDTO(checkItem);
    }

    @Override
    public CheckItemResponseDTO tickCheckItem(long checkItemId) {
        log.info("Fetching check item with ID: {}", checkItemId);
        CheckItem checkItem = checkItemRepository.findById(checkItemId).orElseThrow(() -> {
            log.error("Check item with ID: {} not found", checkItemId);
            return new RuntimeException("Check item not found");
        });
        log.info("Check item with ID: {} found", checkItemId);

        checkItem.setChecked(!checkItem.isChecked());


        BacklogItemRequestDTO backlogItem = modelMapper.map(checkItem.getCard().getBacklogitem(), BacklogItemRequestDTO.class);
        // We need to check if the checkitems completes the state
        List<Card> cards = cardRepository.findByBacklogitem_Id(checkItem.getCard().getBacklogitem().getId());

        boolean isDone = true;
        for(Card card : cards) {
            ScoreResponseDTO score = cardService.getCardScore(card.getId());
            if(score.getActualScore() != score.getTotalScore()){
                isDone = false;
            }
        }

        if(isDone){
            StateResponseDTO nextState = stateService.getNextStateOfType(backlogItem.getProjectId(), backlogItem.getTypeId(), backlogItem.getStateId());

            backlogItem.setStateId(nextState.getId());


            backlogItemService.updateBacklogItem(backlogItem.getId(), backlogItem);
        }

        checkItemRepository.save(checkItem);
        return convertToResponseDTO(checkItem);
    }

    @Override
    @Transactional
    public CheckItemResponseDTO addCheckItem(CheckItemRequestDTO checkItemRequest) {
        log.info("Adding new check item with information: {}", checkItemRequest.getInformation());
        CheckItem checkItem = convertToEntity(checkItemRequest);
        CheckItem savedCheckItem = checkItemRepository.save(checkItem);


        // this mean that we added a new checkitem to a template card
        // we need to add checkitems to appropriate cards (those that are not template)
        if(checkItem.getCard().getBacklogitem() == null){
            Long typeId = checkItem.getCard().getType().getId();
            long stateId = checkItem.getCard().getState().getId();
            List<Card> relevantCards = cardRepository.findByType_IdAndState_IdAndTitle(typeId, stateId, checkItem.getCard().getTitle()).stream()
                    .filter(card -> Objects.nonNull(card.getBacklogitem()))
                    .toList();

            relevantCards.forEach(card -> {

                CheckItem newCheckItem = CheckItem.builder().information(checkItem.getInformation()).checked(false).card(card).build();
                CheckItem newSavedCheckItem = checkItemRepository.save(newCheckItem);
                card.getCheckItemList().add(newSavedCheckItem);
            });

            cardRepository.saveAll(relevantCards);

        }

        log.info("Check item with ID: {} added successfully", savedCheckItem.getId());
        return convertToResponseDTO(savedCheckItem);
    }

    @Override
    public CheckItemResponseDTO updateCheckItem(long id, CheckItemRequestDTO checkItemRequest) {
        log.info("Updating check item with ID: {}", id);
        CheckItem existingCheckItem = checkItemRepository.findById(id).orElseThrow(() -> {
            log.error("Check item with ID: {} not found", id);
            return new RuntimeException("Check item not found");
        });

        Card card = cardRepository.findById(checkItemRequest.getCardId()).orElseThrow( () -> new RuntimeException("Card not found"));

        existingCheckItem.setCard(card);
        existingCheckItem.setInformation(checkItemRequest.getInformation());
        existingCheckItem.setChecked(checkItemRequest.isChecked());
        CheckItem updatedCheckItem = checkItemRepository.save(existingCheckItem);
        log.info("Check item with ID: {} updated successfully", updatedCheckItem.getId());
        return convertToResponseDTO(updatedCheckItem);
    }

    @Override
    public void deleteCheckItemById(long id) {
        log.info("Deleting check item with ID: {}", id);
        if (!checkItemRepository.existsById(id)) {
            log.error("Check item with ID: {} not found", id);
            throw new RuntimeException("Check item not found");
        }
        checkItemRepository.deleteById(id);
        log.info("Check item with ID: {} deleted successfully", id);
    }

    private CheckItemResponseDTO convertToResponseDTO(CheckItem checkItem) {
        return new CheckItemResponseDTO(
                checkItem.getId(),
                checkItem.getCard().getId(),
                checkItem.getInformation(),
                checkItem.isChecked()
        );
    }

    private CheckItem convertToEntity(CheckItemRequestDTO checkItemRequest) {
        Card card = cardRepository.findById(checkItemRequest.getCardId()).orElseThrow(()->new RuntimeException("Card not found"));
        return new CheckItem(
                checkItemRequest.getId(),
                checkItemRequest.getInformation(),
                checkItemRequest.isChecked(),
                card
        );
    }
}
