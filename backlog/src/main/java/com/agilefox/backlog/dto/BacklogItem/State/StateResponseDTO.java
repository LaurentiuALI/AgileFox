package com.agilefox.backlog.dto.BacklogItem.State;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StateResponseDTO {
    private long id;
    private String name;
    private String description;
    private long projectId;
    private int stateOrder;
    private long typeId;
}
