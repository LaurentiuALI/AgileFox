package com.agilefox.model.Node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IconComponent {
    private String src;
    private int width;
    private int height;
    private String blurDataURL;
    private int blurWidth;
    private int blurHeight;
}
