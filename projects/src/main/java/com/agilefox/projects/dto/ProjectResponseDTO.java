package com.agilefox.projects.dto;

import com.agilefox.projects.model.EstimationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseDTO {
    Long id;
    String name;
    String description;
    EstimationType estimationType;
    String abbrev;
}
