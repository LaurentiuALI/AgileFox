package com.agilefox.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDTO {

    private String id;
    private String username;
    private Date created;
    private String firstName;
    private String lastName;
    private String email;
}
