package com.agilefox.backlog.dto.BacklogItem;

import com.agilefox.backlog.dto.BacklogItem.State.StateResponseDTO;
import com.agilefox.backlog.dto.BacklogItem.Type.TypeResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BacklogItemResponseDTO {
    private long id;

    private String uid;

    private long projectId;

    private TypeResponseDTO type;
    private StateResponseDTO state;

    private String title;
    private String description;
    private String username;

    private int totalScore;
    private int actualScore;
}
