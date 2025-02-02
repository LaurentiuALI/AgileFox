package com.agilefox.backlog.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "checkitem")
public class CheckItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String information;
    private boolean checked = false;

    @ManyToOne
    @JoinColumn(name = "cardId")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Card card;
}
