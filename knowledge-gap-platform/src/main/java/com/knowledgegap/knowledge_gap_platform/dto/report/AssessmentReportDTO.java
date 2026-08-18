package com.knowledgegap.knowledge_gap_platform.dto.report;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AssessmentReportDTO(
        Long assessmentId,
        Long skillId,
        String skillName,
        String title,
        BigDecimal score,
        BigDecimal passingScore,
        Boolean passed,
        ProficiencyLevel targetLevel,
        AssessmentStatus status,
        LocalDateTime assessedAt,
        LocalDateTime approvedAt,
        String remarks
) {
}