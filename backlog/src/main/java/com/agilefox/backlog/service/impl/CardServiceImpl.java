package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.dto.CardRequestDTO;
import com.agilefox.backlog.dto.CardResponseDTO;
import com.agilefox.backlog.dto.ScoreResponseDTO;
import com.agilefox.backlog.exceptions.ResourceNotFoundException;
import com.agilefox.backlog.model.*;
import com.agilefox.backlog.repository.*;
import com.agilefox.backlog.service.CardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final CheckItemRepository checkItemRepository;
    private final TypeRepository typeRepository;
    private final StateRepository stateRepository;
    private final BacklogItemRepository backlogItemRepository;

    @Override
    public List<CardResponseDTO> getAllCards() {
        log.info("Fetching all cards");
        List<CardResponseDTO> cards = ((List<Card>) cardRepository.findAll()).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        log.info("Found {} cards", cards.size());
        return cards;
    }

    @Override
    public List<CardResponseDTO> getCardsOfProject(long projectId) {
        log.info("Fetching cards for project with ID: {}", projectId);

        List<CardResponseDTO> cards = ((List<Card>) cardRepository.findAll()).stream()
                .filter(card -> card.getProjectId() == projectId)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        log.info("Found {} cards for project ID: {}", cards.size(), projectId);
        return cards;
    }

    @Override
    public List<CardResponseDTO> getCardsOfState(long stateId) {
        log.info("Fetching cards for state with ID: {}", stateId);
        List<CardResponseDTO> cards = ((List<Card>) cardRepository.findAll()).stream()
                .filter(card -> card.getState().getId() == stateId)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        log.info("Found {} cards for state ID: {}", cards.size(), stateId);
        return cards;
    }

    @Override
    public List<CardResponseDTO> getCardsOfType(long typeId) {
        log.info("Fetching cards for type with ID: {}", typeId);
        List<CardResponseDTO> cards = ((List<Card>) cardRepository.findAll()).stream()
                .filter(card -> card.getType().getId() == typeId)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        log.info("Found {} cards for type ID: {}", cards.size(), typeId);
        return cards;
    }

    @Override
    public CardResponseDTO getCardById(long cardId) {
        log.info("Fetching card with ID: {}", cardId);
        Card card = cardRepository.findById(cardId).orElseThrow(() -> {
            log.error("Card with ID: {} not found", cardId);
            return new RuntimeException("Card not found");
        });
        log.info("Card with ID: {} found", cardId);
        return convertToResponseDTO(card);
    }

    @Override
    public ScoreResponseDTO getCardScore(long cardId){
        List<CheckItem> checkItems = checkItemRepository.findCheckItemsByCardId(cardId);

        checkItems.forEach(checkItem -> { log.info("CheckItem: {}", checkItem); });
        int totalScore = 0;
        int actualScore = 0;

        for(CheckItem checkItem : checkItems){
            if(checkItem.isChecked()){
                totalScore++;
                actualScore++;
            } else {
                totalScore++;
            }
        }

        return new ScoreResponseDTO(totalScore, actualScore);
    }

    @Transactional
    @Override
    public CardResponseDTO addCard(CardRequestDTO cardRequest) {
        log.info("Adding new card with title: {}", cardRequest.getTitle());
        Card card = convertToEntity(cardRequest);
        Card savedCard = cardRepository.save(card);

        //this mean that a new template card was added we need to update all appropriate backlogitems to contain it
        if(savedCard.getBacklogitem() == null){
            log.info("New template card. Updating existing backlogitems...");
            List<BacklogItem> backlogItems = backlogItemRepository.findByType_IdAndState_Id(savedCard.getType().getId(), savedCard.getState().getId());
            log.info("Found {} backlog items to update...", backlogItems.size());

            for(BacklogItem backlogItem : backlogItems){
                Card newCard = convertToEntity(cardRequest);
                newCard.setBacklogitem(backlogItem);
                cardRepository.save(newCard);
            }
            log.info("Update complete.");
        }


        log.info("Card with ID: {} added successfully", savedCard.getId());
        return convertToResponseDTO(savedCard);
    }

    @Override
    public CardResponseDTO updateCard(long id, CardRequestDTO cardRequest) {
        log.info("Updating card with ID: {}", id);
        Card existingCard = cardRepository.findById(id).orElseThrow(() -> {
            log.error("Card with ID: {} not found", id);
            return new RuntimeException("Card not found");
        });

        Type type = typeRepository.findById(existingCard.getType().getId()).orElseThrow( () -> new RuntimeException("Type not found"));
        State state = stateRepository.findById(existingCard.getState().getId()).orElseThrow(() -> new RuntimeException("State not found"));

        BacklogItem backlogItem = backlogItemRepository.findById(existingCard.getBacklogitem().getId()).orElse(null);

        existingCard.setProjectId(cardRequest.getProjectId());
        existingCard.setType(type);
        existingCard.setState(state);
        existingCard.setBacklogitem(backlogItem);
        existingCard.setTitle(cardRequest.getTitle());
        existingCard.setPurpose(cardRequest.getPurpose());
        Card updatedCard = cardRepository.save(existingCard);
        log.info("Card with ID: {} updated successfully", updatedCard.getId());
        return convertToResponseDTO(updatedCard);
    }

    @Override
    public void deleteCardById(long id) {
        log.info("Deleting card with ID: {}", id);
        if (!cardRepository.existsById(id)) {
            log.error("Card with ID: {} not found", id);
            throw new RuntimeException("Card not found");
        }
        cardRepository.deleteById(id);
        log.info("Card with ID: {} deleted successfully", id);
    }

    private CardResponseDTO convertToResponseDTO(Card card) {
        return new CardResponseDTO(
                card.getId(),
                card.getProjectId(),
                card.getType(),
                card.getState(),
                card.getBacklogitem(),
                card.getTitle(),
                card.getPurpose()
        );
    }

    private Card convertToEntity(CardRequestDTO cardRequest) {

        Type type = typeRepository.findById(cardRequest.getTypeId()).orElseThrow( () -> new RuntimeException("Type not found"));
        State state = stateRepository.findById(cardRequest.getStateId()).orElseThrow( () -> new RuntimeException("State not found"));

        BacklogItem backlogItem = backlogItemRepository.findById(cardRequest.getId()).orElse(null);

        List<CheckItem> checkItems = checkItemRepository.findCheckItemsByCardId(cardRequest.getId());

        return new Card(
                cardRequest.getId(),
                cardRequest.getProjectId(),
                type,
                state,
                backlogItem,
                cardRequest.getTitle(),
                cardRequest.getPurpose(),
                checkItems
        );
    }
}
