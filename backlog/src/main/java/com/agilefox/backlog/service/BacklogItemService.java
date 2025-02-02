package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.ScoreResponseDTO;

import java.util.List;

public interface BacklogItemService {

    public List<BacklogItemResponseDTO> getAllBacklogItems();
    public List<BacklogItemResponseDTO> getAllBacklogItemStateTypes(Long projectId);
    public BacklogItemResponseDTO getBacklogItemByProjectAndId(Long projectId, Long backlogItemId);
    public ScoreResponseDTO getBacklogItemScore(long backlogItemId);

    public BacklogItemResponseDTO addBacklogItem(BacklogItemRequestDTO backlogItemRequestDTO);

    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO backlogItemRequestDTO);

    public void deleteBacklogItem(Long id);
}
