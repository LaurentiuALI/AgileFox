package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.BacklogItem.Type.TypeRequestDTO;
import com.agilefox.backlog.dto.BacklogItem.Type.TypeResponseDTO;
import com.agilefox.backlog.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/type")
public class TypeController {
    private final TypeService typeService;

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public List<TypeResponseDTO> getTypes(@RequestParam(name = "projectId", required = false) Long projectId) {
        if (projectId != null) {
            return typeService.getTypesOfProject(projectId); // Call this method if projectId is provided
        } else {
            return typeService.getTypes(); // Call this method if projectId is not provided
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TypeResponseDTO createType(@RequestBody TypeRequestDTO typeRequest){
        return typeService.addType(typeRequest);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteType(@RequestParam Long id){
        typeService.deleteType(id);
    }
}
