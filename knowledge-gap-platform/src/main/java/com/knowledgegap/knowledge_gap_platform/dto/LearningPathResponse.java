package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.RecommendationSource;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPathResponse {

    private Long id;

    private Long userId;

    private String userName;

    private RecommendationSource generatedBy;

    private LearningPathStatus status;

    private LocalDateTime createdAt;
}