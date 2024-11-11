package com.agilefox.backlog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeResponseDTO {
    Long id;
    String name;
    Long projectId;
}
