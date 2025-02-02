package com.agilefox.backlog.repository;

import com.agilefox.backlog.model.Card;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardRepository extends CrudRepository<Card, Long> {

    List<Card> findByType_IdAndState_Id(long typeId, long stateId);

}
