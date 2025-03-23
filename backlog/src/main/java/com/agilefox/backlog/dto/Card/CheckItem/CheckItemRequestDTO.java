package com.agilefox.backlog.dto.Card.CheckItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CheckItemRequestDTO {

    private long id;

    private long cardId;

    private String information;
    private boolean checked;
}
