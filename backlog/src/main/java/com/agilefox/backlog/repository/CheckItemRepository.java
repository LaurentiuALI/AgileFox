package com.agilefox.backlog.repository;

import com.agilefox.backlog.model.CheckItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CheckItemRepository extends CrudRepository<CheckItem, Long> {
    List<CheckItem> findCheckItemsByCardId(long cardId);
}
