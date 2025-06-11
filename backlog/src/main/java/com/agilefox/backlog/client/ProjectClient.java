package com.agilefox.backlog.client;

import com.agilefox.backlog.config.AuthFeignInterceptor;
import com.agilefox.backlog.dto.Project.ProjectResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "projects", url = "${project-service-url}", configuration = AuthFeignInterceptor.class)
public interface ProjectClient {
    @RequestMapping(method = RequestMethod.GET, value="/project/{id}")
    ProjectResponseDTO getProjectById(@PathVariable Long id);

}
