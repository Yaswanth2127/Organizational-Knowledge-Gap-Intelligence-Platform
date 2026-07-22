package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KnowledgeGapResponse {

    private Long id;

    private Long userId;
    private String userName;

    private Long skillId;
    private String skillName;

    private Integer requiredLevel;

    private Integer currentLevel;

    private Integer gap;

    private String gapStatus;

    private LocalDateTime lastUpdated;
}