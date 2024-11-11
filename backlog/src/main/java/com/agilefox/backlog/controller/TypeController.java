package com.agilefox.backlog.controller;

import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.dto.TypeResponseDTO;
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
    public List<TypeResponseDTO> getTypes(){
        return typeService.getTypes();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TypeResponseDTO createType(@RequestBody TypeRequestDTO typeRequest){
        return typeService.addType(typeRequest);
    }
}
