package com.agilefox.backlog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "state")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String description;

    private long projectId;

    @ManyToOne
    @JoinColumn( name="typeId", nullable = false)
    private Type type;

    private int stateOrder;


}

