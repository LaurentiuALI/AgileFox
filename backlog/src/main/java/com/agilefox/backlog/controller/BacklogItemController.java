package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.ScoreResponseDTO;
import com.agilefox.backlog.service.BacklogItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/backlogitem")
@RequiredArgsConstructor
public class BacklogItemController {

    private final BacklogItemService backlogItemService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
//    @PreAuthorize("hasRole('client_admin')")
    public List<BacklogItemResponseDTO> getBacklogItemsByProjectId(@RequestParam Long projectId) {
        return backlogItemService.getAllBacklogItemStateTypes(projectId);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BacklogItemResponseDTO getBacklogItemByProjectIdAndId(@PathVariable Long id, @RequestParam Long projectId) {
        return backlogItemService.getBacklogItemByProjectAndId(projectId, id);
    }

    @GetMapping("/score/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ScoreResponseDTO getScoreById(@PathVariable Long id) {

        return backlogItemService.getBacklogItemScore(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BacklogItemResponseDTO createBacklogItem(@RequestBody BacklogItemRequestDTO requestDTO){
        return backlogItemService.addBacklogItem(requestDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void deleteBacklogItem(@PathVariable Long id){
        backlogItemService.deleteBacklogItem(id);
    }
}
