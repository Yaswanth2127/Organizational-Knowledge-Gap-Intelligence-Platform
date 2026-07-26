package com.knowledgegap.knowledge_gap_platform.entity;

import lombok.Getter;

@Getter
public enum GapSeverity {
    NONE(0),
    LOW(1),
    MEDIUM(2),
    HIGH(3),
    CRITICAL(4);
    private  final int value;
     GapSeverity(int value){
        this.value=value;
    }

}
