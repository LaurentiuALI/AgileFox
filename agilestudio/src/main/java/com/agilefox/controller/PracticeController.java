package com.agilefox.controller;


import com.agilefox.model.Practice;
import com.agilefox.service.PracticeServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agilestudio")
@Slf4j
public class PracticeController {
    private final PracticeServiceImpl practiceServiceImpl;

    public PracticeController(PracticeServiceImpl practiceServiceImpl) {
        this.practiceServiceImpl = practiceServiceImpl;
    }

    @GetMapping("/all")
    public List<Practice> getAll() {
        List<Practice> all = practiceServiceImpl.getPractices();
        log.info("Retrieved {} Practice docs: {}", all.size(), all);
        return all;
    }

    @GetMapping("/practice")
    public List<Practice> getPractices(@RequestParam Optional<String> id, @RequestParam Long projectId) {
        if(id.isPresent()){
            List<Practice> practices = new ArrayList<Practice>();
            practices.add(practiceServiceImpl.getPractice(id.get()));
            return practices;
        }
        return practiceServiceImpl.getPracticesOfProject(projectId);
    }

    @PostMapping("/practice")
    public Practice addPractice(@RequestBody Practice practice) {
        return practiceServiceImpl.addPractice(practice);
    }

    @PatchMapping("/practice")
    public Practice updatePractice(@RequestParam String id, @RequestBody Practice practice) {
        return practiceServiceImpl.updatePractice(id, practice);
    }

    @DeleteMapping("/practice")
    public void deletePractice(@RequestParam String id) {
        practiceServiceImpl.deletePractice(id);
    }

}
