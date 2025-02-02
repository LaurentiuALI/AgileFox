package com.agilefox.backlog.dto;

import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
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

    private Type type;
    private State state;

    private String title;
    private String description;

}
