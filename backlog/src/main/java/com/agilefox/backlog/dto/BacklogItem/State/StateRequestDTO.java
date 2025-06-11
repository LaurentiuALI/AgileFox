package com.agilefox.backlog.dto.BacklogItem.State;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StateRequestDTO {
    private Long id;
    private String name;
    private String description;
    private long projectId;
    private long typeId;
    private int stateOrder;

}
