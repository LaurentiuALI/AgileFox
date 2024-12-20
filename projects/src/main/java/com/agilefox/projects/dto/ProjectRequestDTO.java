package com.agilefox.projects.dto;

import com.agilefox.projects.model.EstimationType;
import lombok.Data;

@Data
public class ProjectRequestDTO {
    Long id;
    String name;
    String description;
    String estimation_type;
    String abbrev;
}
