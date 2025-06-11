package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.BacklogItem.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.Card.CheckItem.Score.ScoreResponseDTO;

import java.util.List;
import java.util.Optional;

public interface BacklogItemService {

    public List<BacklogItemResponseDTO> getBacklogItems(Long projectId,Long id, String username);
    BacklogItemResponseDTO getBacklogItem(Long projectId,Long id);
    public List<BacklogItemResponseDTO> getAllBacklogItemStateTypes(Long projectId);
    public BacklogItemResponseDTO getBacklogItemByProjectAndId(Long projectId, Long backlogItemId);
    public ScoreResponseDTO getBacklogItemScore(long backlogItemId);

    public BacklogItemResponseDTO addBacklogItem(BacklogItemRequestDTO backlogItemRequestDTO);

    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO backlogItemRequestDTO);

    public void deleteBacklogItem(Long id);
}
