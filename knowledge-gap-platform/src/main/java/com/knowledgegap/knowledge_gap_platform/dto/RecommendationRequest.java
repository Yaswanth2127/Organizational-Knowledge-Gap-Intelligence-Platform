package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long courseId;

    private Long skillGapId;

    private BigDecimal relevanceScore;

    private String reason;

    private Boolean accepted;
}