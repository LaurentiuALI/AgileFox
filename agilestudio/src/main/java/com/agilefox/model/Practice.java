package com.agilefox.model;

import com.agilefox.model.Node.Node;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "practice")
public class Practice {
    @Id
    private String id;
    private String title;
    private long projectId;
    private Node[] nodes;
    private Edge[] edges;

    public Practice(String title, long projectId, Node[] nodes, Edge[] edges) {
        this.title = title;
        this.projectId = projectId;
        this.nodes = nodes;
        this.edges = edges;
    }
}
