package com.agilefox.backlog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BacklogItemRequestDTO {
    private long id;

    private String uid;

    private long projectId;
    private long typeId;
    private long stateId;

    private String title;
    private String description;

}
