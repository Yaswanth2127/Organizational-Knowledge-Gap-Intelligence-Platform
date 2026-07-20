package com.knowledgegap.knowledge_gap_platform.entity.enums;

import lombok.Getter;

@Getter
public enum ProficiencyLevel {
    UNAWARE (0),
    BEGINNER  (1) ,
    INTERMEDIATE(2),
    ADVANCED(3),
    EXPERT(4);

    private final int value;

    ProficiencyLevel(int value) {
        this.value=value;
    }

}
