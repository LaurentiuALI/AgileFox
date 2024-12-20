package com.agilefox.backlog.dto;

import com.agilefox.backlog.model.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StateRequestDTO {
    private long id;
    private String name;
    private String description;
    private long projectId;

    public StateRequestDTO(State state){
        this.id = state.getId();
        this.name = state.getName();
        this.description = state.getDescription();
        this.projectId = state.getProjectId();
    }
}
