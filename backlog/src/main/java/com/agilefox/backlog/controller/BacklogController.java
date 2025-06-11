package com.agilefox.backlog.controller;

import com.agilefox.backlog.service.CardService;
import com.agilefox.backlog.service.StateService;
import com.agilefox.backlog.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backlogitem")
@RequiredArgsConstructor
public class BacklogController {


    private final StateService stateService;
    private final CardService cardService;
    TypeService typeService;

//    @PostMapping("/initialize")
//    public void initialize(Long projectId) {
//
//        TypeRequestDTO storyType = new TypeRequestDTO(null, "Story", projectId);
//        TypeRequestDTO bugType = new TypeRequestDTO(null, "Bug", projectId);
//        TypeRequestDTO spikeType = new TypeRequestDTO(null, "Spike", projectId);
//
//        TypeResponseDTO story = typeService.addType(storyType);
//
//        StateRequestDTO openState       = new StateRequestDTO(null, "Open", "This represent a newly created story", projectId, story.getId(), 0);
//        StateRequestDTO inProgressState = new StateRequestDTO(null, "In Progress", "This represent a story for which the work started", projectId, story.getId(), 0);
//        StateRequestDTO validatingState = new StateRequestDTO(null, "Validating", "This represent a story for which most work is finish and is getting validated", projectId, story.getId(), 0);
//        StateRequestDTO doneState       = new StateRequestDTO(null, "Done", "This represent a story for which final checks are made before closing it", projectId, story.getId(), 0);
//
//        stateService.addState(openState);
//        stateService.addState(inProgressState);
//        stateService.addState(validatingState);
//        stateService.addState(doneState);
//
//
//        CardRequestDTO card = new CardRequestDTO();
//        cardService.addCard();
//
//        TypeResponseDTO spike = typeService.addType(spikeType);
//        TypeResponseDTO bug = typeService.addType(bugType);
//    }
}
