package com.agilefox.backlog.dto.Card;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CardRequestDTO {
    private Long id;

    private long projectId;
    private long typeId;
    private long stateId;
    private Long backlogItemId;

    private String title;
    private String purpose;
}
