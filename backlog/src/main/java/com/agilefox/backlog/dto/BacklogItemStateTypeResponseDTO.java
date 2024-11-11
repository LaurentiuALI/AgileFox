package com.agilefox.backlog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BacklogItemStateTypeResponseDTO {
    private Long id;

    private String uid;

    private Long projectId;

    private String typeName;
    private String stateName;

    private String title;
    private String description;

}
