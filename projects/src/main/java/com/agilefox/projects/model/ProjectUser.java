package com.agilefox.projects.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "project_user")
@IdClass(ProjectUserId.class)  // Composite key class
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectUser {

    @Id
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Id
    @Column(name = "user_id")
    private String userId;  // Stores Keycloak's user ID (UUID format)
}

