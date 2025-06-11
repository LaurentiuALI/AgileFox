package com.agilefox.projects.dto;

import lombok.Data;

@Data
public class ProjectRequestDTO {
    Long id;
    String name;
    String description;
    String estimation_type;
    String abbrev;
}
