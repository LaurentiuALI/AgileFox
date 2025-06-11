package com.agilefox.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Edge {
    private String source;
    private String sourceHandle;
    private String target;
    private String targetHandle;
    @Field("_id")
    private String id;
    private Boolean selected;
    private String label;
}
