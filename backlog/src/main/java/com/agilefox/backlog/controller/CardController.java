package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.CardRequestDTO;
import com.agilefox.backlog.dto.CardResponseDTO;
import com.agilefox.backlog.dto.ScoreResponseDTO;
import com.agilefox.backlog.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping
    public ResponseEntity<List<CardResponseDTO>> getAllCards() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<CardResponseDTO>> getCardsOfProject(@PathVariable long projectId) {
        return ResponseEntity.ok(cardService.getCardsOfProject(projectId));
    }

    @GetMapping("/state/{stateId}")
    public ResponseEntity<List<CardResponseDTO>> getCardsOfState(@PathVariable long stateId) {
        return ResponseEntity.ok(cardService.getCardsOfState(stateId));
    }

    @GetMapping("/type/{typeId}")
    public ResponseEntity<List<CardResponseDTO>> getCardsOfType(@PathVariable long typeId) {
        return ResponseEntity.ok(cardService.getCardsOfType(typeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardResponseDTO> getCardById(@PathVariable long id) {
        return ResponseEntity.ok(cardService.getCardById(id));
    }

    @PostMapping
    public ResponseEntity<CardResponseDTO> addCard(@RequestBody CardRequestDTO cardRequest) {
        return ResponseEntity.ok(cardService.addCard(cardRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CardResponseDTO> updateCard(@PathVariable long id, @RequestBody CardRequestDTO cardRequest) {
        return ResponseEntity.ok(cardService.updateCard(id, cardRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable long id) {
        cardService.deleteCardById(id);
        return ResponseEntity.noContent().build();
    }
}
