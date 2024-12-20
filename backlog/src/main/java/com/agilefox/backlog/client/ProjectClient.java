package com.agilefox.backlog.client;

import com.agilefox.backlog.config.AuthFeignInterceptor;
import com.agilefox.backlog.dto.ProjectResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "projects", url = "http://localhost:8085", configuration = AuthFeignInterceptor.class)
public interface ProjectClient {
    @RequestMapping(method = RequestMethod.GET, value="/project/{id}")
    ProjectResponseDTO getProjectById(@PathVariable Long id);

}
