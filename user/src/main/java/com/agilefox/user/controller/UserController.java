package com.agilefox.user.controller;

import com.agilefox.user.dto.UserResponseDTO;
import com.agilefox.user.service.KeycloakUserService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/user")
@RestController
public class UserController {

    private final KeycloakUserService userService;

    public UserController(KeycloakUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<String> getUser(@PathVariable String username) {
        String user = userService.getUserIdByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
