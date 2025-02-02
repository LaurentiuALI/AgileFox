package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.CheckItemRequestDTO;
import com.agilefox.backlog.dto.CheckItemResponseDTO;
import com.agilefox.backlog.service.CheckItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkitem")
@RequiredArgsConstructor
public class CheckItemController {

    private final CheckItemService checkItemService;

    @GetMapping
    public ResponseEntity<List<CheckItemResponseDTO>> getAllCheckItems() {
        return ResponseEntity.ok(checkItemService.getAllCheckItems());
    }

    @GetMapping("/card/{cardId}")
    public ResponseEntity<List<CheckItemResponseDTO>> getCheckItemsOfCard(@PathVariable long cardId) {
        return ResponseEntity.ok(checkItemService.getCheckItemsOfCard(cardId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckItemResponseDTO> getCheckItemById(@PathVariable long id) {
        return ResponseEntity.ok(checkItemService.getCheckItemById(id));
    }

    @PostMapping("/check/{id}")
    public ResponseEntity<CheckItemResponseDTO> tickCheckItem(@PathVariable long id) {
        return ResponseEntity.ok(checkItemService.tickCheckItem(id));
    }

    @PostMapping
    public ResponseEntity<CheckItemResponseDTO> addCheckItem(@RequestBody CheckItemRequestDTO checkItemRequest) {
        return ResponseEntity.ok(checkItemService.addCheckItem(checkItemRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CheckItemResponseDTO> updateCheckItem(@PathVariable long id, @RequestBody CheckItemRequestDTO checkItemRequest) {
        return ResponseEntity.ok(checkItemService.updateCheckItem(id, checkItemRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCheckItem(@PathVariable long id) {
        checkItemService.deleteCheckItemById(id);
        return ResponseEntity.noContent().build();
    }
}
