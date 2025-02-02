package com.agilefox.backlog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ScoreResponseDTO {

    int totalScore;
    int actualScore;
}
