package com.agilefox.backlog.service;

import com.agilefox.backlog.dto.TypeRequestDTO;
import com.agilefox.backlog.dto.TypeResponseDTO;

import java.util.List;

public interface TypeService {
    public List<TypeResponseDTO> getTypes();
    public TypeResponseDTO addType(TypeRequestDTO typeRequest);
    public TypeResponseDTO updateState(Long id, TypeRequestDTO typeRequest);
    public void deleteType(Long id);
}
