package com.agilefox.backlog.util;

import com.agilefox.backlog.model.State;
import com.agilefox.backlog.model.Type;
import com.agilefox.backlog.repository.StateRepository;
import com.agilefox.backlog.repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Component
public class DataLoader implements CommandLineRunner {

    private StateRepository stateRepository;
    private TypeRepository typeRepository;

    private void loadUserData() {

        if(stateRepository.count() == 0) {
            State state1 = State.builder().name("Open").description("This marks the item as Open").projectId(7).build();
            State state2 = State.builder().name("In Progress").description("This marks the item as In Progress").projectId(7).build();
            State state3 = State.builder().name("Done").description("This marks the item as Done").projectId(7).build();



            stateRepository.save(state1);
            stateRepository.save(state2);
            stateRepository.save(state3);
        }

        if(typeRepository.count() == 0) {
            Type type1 = Type.builder().name("Story").projectId(7L).build();
            Type type2 = Type.builder().name("Bug").projectId(7L).build();
            Type type3 = Type.builder().name("Task").projectId(7L).build();

            typeRepository.save(type1);
            typeRepository.save(type2);
            typeRepository.save(type3);
        }

    }


    @Override
    public void run(String... args) throws Exception {
        loadUserData();
    }
}