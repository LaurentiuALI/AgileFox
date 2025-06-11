package com.agilefox.model.Node;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NodeData {
    private String label;
    private String iconType;
    private String description;
    private boolean shorten;
//    @JsonProperty("IconComponent")
    private IconComponent iconComponent;

}
