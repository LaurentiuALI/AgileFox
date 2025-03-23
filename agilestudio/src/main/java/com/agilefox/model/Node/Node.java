package com.agilefox.model.Node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Node {
    private String id;
    private Position position;
    private String type;
    private NodeData data;
    private Measured measured;
    private Boolean selected;
    private Boolean dragging;

}
