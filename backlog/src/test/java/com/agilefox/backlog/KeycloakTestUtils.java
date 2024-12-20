package com.agilefox.backlog;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public class KeycloakTestUtils {

    public static String obtainAccessToken(String authServerUrl, String realm, String clientId, String username, String password) {
        String tokenEndpoint = String.format("%s/realms/%s/protocol/openid-connect/token", authServerUrl, realm);

        // Prepare headers and payload
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = String.format(
                "client_id=%s&username=%s&password=%s&grant_type=password",
                clientId,
                username,
                password
        );

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        // Perform request to get token
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(tokenEndpoint, HttpMethod.POST, entity, Map.class);

        // Extract and return the access token
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("access_token")) {
            return (String) responseBody.get("access_token");
        } else {
            throw new RuntimeException("Failed to obtain access token from Keycloak");
        }
    }
}
