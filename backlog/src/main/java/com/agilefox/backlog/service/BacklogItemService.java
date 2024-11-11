package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.BacklogItemRequestDTO;
import com.agilefox.backlog.dto.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItemStateTypeResponseDTO;

import java.util.List;

public interface BacklogItemService {

    public List<BacklogItemResponseDTO> getAllBacklogItems();
    public List<BacklogItemStateTypeResponseDTO> getAllBacklogItemStateTypes(Long projectId);
    public BacklogItemResponseDTO addBacklogItem(BacklogItemRequestDTO backlogItemRequestDTO);
    public BacklogItemResponseDTO updateBacklogItem(Long id, BacklogItemRequestDTO backlogItemRequestDTO);
    public void deleteBacklogItem(Long id);
}
