package com.agilefox.repository;

import com.agilefox.model.Practice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PracticeRepository extends MongoRepository<Practice, String> {
    public List<Practice> getPracticeByProjectId(long projectId);
}
