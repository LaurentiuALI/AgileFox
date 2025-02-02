package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.CheckItemRequestDTO;
import com.agilefox.backlog.dto.CheckItemResponseDTO;

import java.util.List;

public interface CheckItemService {
    List<CheckItemResponseDTO> getAllCheckItems();
    List<CheckItemResponseDTO> getCheckItemsOfCard(long cardId);
    CheckItemResponseDTO getCheckItemById(long checkItemId);

    CheckItemResponseDTO tickCheckItem(long checkItemId);

    public CheckItemResponseDTO addCheckItem(CheckItemRequestDTO CheckItemRequest);

    public CheckItemResponseDTO updateCheckItem(long id, CheckItemRequestDTO CheckItemRequest);

    public void deleteCheckItemById(long id);
}
