package com.agilefox.projects.client;

import com.agilefox.projects.config.AuthFeignInterceptor;
import com.agilefox.projects.dto.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(name = "user", url = "http://localhost:8085", configuration = AuthFeignInterceptor.class)
public interface UserClient {
    @RequestMapping(method = RequestMethod.GET, value="/user/{username}")
    String getUser(@PathVariable String username);

    @RequestMapping(method = RequestMethod.GET, value = "/user")
    List<UserResponseDTO> getUsers();
}
