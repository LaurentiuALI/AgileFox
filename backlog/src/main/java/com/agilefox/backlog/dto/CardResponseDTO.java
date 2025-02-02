package com.agilefox.backlog.dto;

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
    private Type type;
    private State state;

    private BacklogItem backlogItem;

    private String title;
    private String purpose;
}
