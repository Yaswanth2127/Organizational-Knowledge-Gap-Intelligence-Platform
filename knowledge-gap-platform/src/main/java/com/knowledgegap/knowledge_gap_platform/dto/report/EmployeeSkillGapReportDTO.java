package com.knowledgegap.knowledge_gap_platform.dto.report;

import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.GapStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EmployeeSkillGapReportDTO(
        Long skillGapId,
        Long skillId,
        String skillName,
        ProficiencyLevel currentLevel,
        ProficiencyLevel requiredLevel,
        BigDecimal gapScore,
        GapSeverity severity,
        GapStatus status,
        LocalDateTime detectedAt,
        LocalDateTime lastAnalyzedAt,
        LocalDateTime resolvedAt
) {
}