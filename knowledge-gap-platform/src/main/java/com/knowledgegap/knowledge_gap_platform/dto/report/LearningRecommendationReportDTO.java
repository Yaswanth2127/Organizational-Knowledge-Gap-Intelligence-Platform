package com.knowledgegap.knowledge_gap_platform.dto.report;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LearningRecommendationReportDTO(
        Long recommendationId,
        Long courseId,
        String courseName,
        Long skillGapId,
        Long learningPathId,
        BigDecimal relevanceScore,
        String reason,
        Boolean accepted,
        LocalDateTime generatedAt
) {
}