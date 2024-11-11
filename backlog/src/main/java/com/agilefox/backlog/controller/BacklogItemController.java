package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItemStateTypeResponseDTO;
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
    public List<BacklogItemStateTypeResponseDTO> getBacklogItemsByProjectId(@RequestParam Long projectId) {
        return backlogItemService.getAllBacklogItemStateTypes(projectId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BacklogItemResponseDTO createBacklogItem(@RequestBody BacklogItemRequestDTO requestDTO){
        return backlogItemService.addBacklogItem(requestDTO);
    }
}
