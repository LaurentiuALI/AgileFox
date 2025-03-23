package com.agilefox.backlog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    Long projectId;

    @OneToMany(mappedBy = "type", cascade= CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonIgnore
    List<State> states;
}
