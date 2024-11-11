package com.agilefox.backlog.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("projects")
public interface ProjectClient {
    @RequestMapping(method = RequestMethod.GET, value="/api/project/{id}")
    boolean projectExist(@PathVariable Long id);

}
