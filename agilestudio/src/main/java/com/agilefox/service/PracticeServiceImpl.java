package com.agilefox.service;

import com.agilefox.model.Practice;
import com.agilefox.repository.PracticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PracticeServiceImpl {
    private final PracticeRepository practiceRepository;

    public List<Practice> getPractices() {
        return practiceRepository.findAll();
    }

    public Practice getPractice(String id) {
        return practiceRepository.findById(id).orElseThrow();
    }

    public Practice addPractice(Practice practice) {
        return practiceRepository.save(practice);
    }

    public Practice updatePractice(String id, Practice practice) {
        if (practiceRepository.findById(id).isPresent()) {
            // Ensure the practice object's id matches the provided id
            practice.setId(id);
            log.info(practice.toString());
            return practiceRepository.save(practice);
        } else {
            throw new IllegalArgumentException("Practice not found");
        }
    }

    public void deletePractice(String id) {
        if( practiceRepository.findById(id).isPresent() ) {
            practiceRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Practice not found");
        }

    }

    public List<Practice> getPracticesOfProject(Long projectId) {
        return practiceRepository.getPracticeByProjectId(projectId);
    }
}
