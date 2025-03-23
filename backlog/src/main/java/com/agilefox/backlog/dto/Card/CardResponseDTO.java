package com.agilefox.backlog.dto.Card;

import com.agilefox.backlog.dto.BacklogItem.BacklogItemResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.Type.TypeResponseDTO;
import com.agilefox.backlog.model.BacklogItem;
import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CardResponseDTO {
    private long id;

    private long projectId;
    private TypeResponseDTO type;
    private StateResponseDTO state;

    private BacklogItemResponseDTO backlogItem;

    private String title;
    private String purpose;
}
