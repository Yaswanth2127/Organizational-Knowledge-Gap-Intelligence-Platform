package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long courseId;

    private String courseTitle;

    private Long skillGapId;

    private BigDecimal relevanceScore;

    private String reason;

    private Boolean accepted;

    private LocalDateTime generatedAt;
}