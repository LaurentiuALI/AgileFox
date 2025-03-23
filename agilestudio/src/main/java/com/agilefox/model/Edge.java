package com.agilefox.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Edge {
    private String source;
    private String sourceHandle;
    private String target;
    private String targetHandle;
    private String id;
    private Boolean selected;
    private String label;
}
