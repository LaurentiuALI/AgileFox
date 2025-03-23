package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.Card.CardRequestDTO;
import com.agilefox.backlog.dto.Card.CardResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.Score.ScoreResponseDTO;

import java.util.List;

public interface CardService {
    List<CardResponseDTO> getAllCards();
    List<CardResponseDTO> getCardsOfProject(long projectId);
    List<CardResponseDTO> getCardsOfState(long stateId);
    List<CardResponseDTO> getCardsOfType(long typeId);
    CardResponseDTO getCardById(long cardId);

    ScoreResponseDTO getCardScore(long cardId);

    public CardResponseDTO addCard(CardRequestDTO cardRequest);

    public CardResponseDTO updateCard(long id, CardRequestDTO cardRequest);

    public void deleteCardById(long id);
}
