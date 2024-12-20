package com.agilefox.projects.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "project")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "estimation_type", columnDefinition = "estimation_type")
    private EstimationType estimationType;

    private String abbrev;

}
