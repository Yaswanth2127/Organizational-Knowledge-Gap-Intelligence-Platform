package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.enums.RecommendationSource;
import com.knowledgegap.knowledge_gap_platform.enums.LearningPathStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPathRequest {

    @NotNull
    private Long userId;

    private RecommendationSource generatedBy;

    private LearningPathStatus status;
}