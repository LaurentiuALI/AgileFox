package com.agilefox.backlog.service.impl;

import com.agilefox.backlog.client.ProjectClient;
import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.dto.TypeResponseDTO;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.TypeRepository;
import com.agilefox.backlog.service.TypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TypeServiceImpl implements TypeService {
    private final TypeRepository typeRepository;
    private final ProjectClient projectClient;

    @Override
    public List<TypeResponseDTO> getTypes() {

        log.info("Query for types");

       return typeRepository.findAll().stream().map(type -> new TypeResponseDTO(type.getId(), type.getName(), type.getProjectId())).collect(Collectors.toList());
    }

    @Override
    public TypeResponseDTO addType(TypeRequestDTO typeRequest) {
        log.info("START - Adding type {}", typeRequest.getName());
        log.info("START - query for project existence with id {}", typeRequest.getProjectId());
        var projectExist = projectClient.projectExist(typeRequest.getProjectId());
        log.info("END - query for project existence with id {}", typeRequest.getProjectId());

        if(projectExist) {
            Type type = Type.builder()
                    .name(typeRequest.getName())
                    .projectId(typeRequest.getProjectId())
                    .build();
            typeRepository.save(type);
            log.info("END - Adding type {}", typeRequest);
            return new TypeResponseDTO(type.getId(), type.getName(), type.getProjectId());
        } else{
            log.error("Project with id {} not found", typeRequest.getProjectId());
        }
        log.info("END - Adding type {}", typeRequest);
        return null;
    }

    @Override
    public TypeResponseDTO updateState(Long id, TypeRequestDTO typeRequest) {
        log.info("START - Updating type {}", typeRequest);

        Type type = typeRepository.findById(id).orElse(null);

        if(type != null){
            type.setName(typeRequest.getName());
            typeRepository.save(type);
            log.info("END - Updating type {}", typeRequest);
            return new TypeResponseDTO(id, type.getName(), type.getProjectId());
        } else{
            log.error("Type with id {} not found", id);
            return null;
        }
    }

    @Override
    public void deleteType(Long id) {
        log.info("START - Deleting type {}", id);
        Type type = typeRepository.findById(id).orElse(null);
        if(type != null){
            typeRepository.delete(type);
            log.info("END - Deleting type {}", id);
        } else{
            log.error("Type with id {} not found", id);
        }
    }
}
