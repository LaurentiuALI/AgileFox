package com.agilefox.user.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtGrantedAuthorityConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final Logger log = LoggerFactory.getLogger(JwtGrantedAuthorityConverter.class);



    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter =
            new JwtGrantedAuthoritiesConverter();

    @Value("${jwt.auth.converter.principle-attribute}")
    private String principleAttribute;

    @Value("${jwt.auth.converter.resource-id}")
    private String resourceId;

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                extractAllRoles(jwt).stream()
        ).collect(Collectors.toSet());

        authorities.forEach(System.out::println);
        return new JwtAuthenticationToken(jwt, authorities, getPrincipleClaimName(jwt));
    }

    private String getPrincipleClaimName(Jwt jwt) {
        return principleAttribute != null ?
                jwt.getClaim(principleAttribute) :
                jwt.getClaim(JwtClaimNames.SUB);
    }

    private Collection<? extends GrantedAuthority> extractAllRoles(Jwt jwt) {
        System.out.println(jwt.getTokenValue());
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (realmAccess == null || resourceAccess == null || resourceAccess.get(resourceId) == null) {
            return Set.of();
        }

        Map<String, Object> clientResource = (Map<String, Object>) resourceAccess.get(resourceId);
        Collection<String> realmRoles = (Collection<String>) realmAccess.get("roles");
        Collection<String> resourceRoles = (Collection<String>) clientResource.get("roles");

        Collection<String> allRoles = new java.util.ArrayList<>(List.of());

        allRoles.addAll(realmRoles);
        allRoles.addAll(resourceRoles);

        return allRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }
}