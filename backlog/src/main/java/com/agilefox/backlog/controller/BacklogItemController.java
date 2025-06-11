package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.BacklogItem.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.Score.ScoreResponseDTO;
import com.agilefox.backlog.service.BacklogItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/backlogitem")
@RequiredArgsConstructor
public class BacklogItemController {

    private final BacklogItemService backlogItemService;

    @GetMapping("/item")
    @ResponseStatus(HttpStatus.OK)
    public List<BacklogItemResponseDTO> getBacklogItemsByProjectId(@RequestParam Optional<Long> projectId, @RequestParam Optional<Long> id, @RequestParam Optional<String> username) {
        Long project = projectId.orElse(null);
        Long itemId = id.orElse(null);
        String user = username.orElse(null);
        return backlogItemService.getBacklogItems(project, itemId, user);
    }

    @GetMapping("/item/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BacklogItemResponseDTO getBacklogItem(@RequestParam Long projectId, @PathVariable Long id) {
        return backlogItemService.getBacklogItem(projectId, id);
    }

    @GetMapping("/score/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ScoreResponseDTO getScoreById(@PathVariable Long id) {
        return backlogItemService.getBacklogItemScore(id);
    }

    @PostMapping("/item")
    @ResponseStatus(HttpStatus.CREATED)
    public BacklogItemResponseDTO createBacklogItem(@RequestBody BacklogItemRequestDTO requestDTO){
        return backlogItemService.addBacklogItem(requestDTO);
    }

    @PatchMapping("/item")
    @ResponseStatus(HttpStatus.OK)
    public BacklogItemResponseDTO updateBacklogItem(
            @RequestParam Long id,
            @RequestBody BacklogItemRequestDTO requestDTO) {
        return backlogItemService.updateBacklogItem(id, requestDTO);
    }


    @DeleteMapping("/item")
    @ResponseStatus(HttpStatus.CREATED)
    public void deleteBacklogItem(@RequestParam Long id){
        backlogItemService.deleteBacklogItem(id);
    }
}
