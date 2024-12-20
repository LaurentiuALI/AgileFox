package com.agilefox.backlog.model;

public enum EstimationType {
    DAYS("DAYS"),
    STORY_POINTS("STORY_POINTS");

    private String value;

    EstimationType(String value) {
        this.value = value.toUpperCase();
    }

    String getValue(){
        return this.value;
    }

}
