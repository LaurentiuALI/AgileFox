package com.agilefox.backlog.dto.Project;

import com.agilefox.backlog.model.EstimationType;
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
