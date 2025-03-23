package com.agilefox.backlog.repository;

import com.agilefox.backlog.model.BacklogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BacklogItemRepository extends JpaRepository<BacklogItem, Long> {
    public List<BacklogItem> findByProjectId(Long projectId);
    public List<BacklogItem> findByType_IdAndState_Id(Long typeId, Long stateId);
    Optional<BacklogItem> findByProjectIdAndId(Long projectId, Long id);
}
