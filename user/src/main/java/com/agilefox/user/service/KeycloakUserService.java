package com.agilefox.user.service;

import com.agilefox.user.controller.ResourceNotFoundException;
import com.agilefox.user.dto.UserResponseDTO;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeycloakUserService {

    private final Keycloak keycloak;
    private final ModelMapper modelMapper;

    @Value("${keycloak.realm}")
    private String realm;

    public List<UserResponseDTO> getAllUsers() {
        List<UserRepresentation> users = keycloak.realm(realm).users().list();

        return users.stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
    }

    public String getUserIdByUsername(String username) {

        UserResponseDTO user = getAllUsers().stream().filter(user1 -> user1.getUsername().equals(username)).findFirst().orElse(null);
        if(user == null) {
            throw new ResourceNotFoundException("User with username " + username + " not found");
        }
        return user.getId();
    }

}
