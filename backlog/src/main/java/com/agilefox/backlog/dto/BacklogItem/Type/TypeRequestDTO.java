package com.agilefox.backlog.dto.BacklogItem.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TypeRequestDTO {
    Long id;
    String name;
    Long projectId;
}

