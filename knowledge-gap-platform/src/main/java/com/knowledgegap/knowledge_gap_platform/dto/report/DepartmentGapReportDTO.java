package com.knowledgegap.knowledge_gap_platform.dto.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DepartmentGapReportDTO(
        Long departmentId,
        String departmentName,
        Long skillId,
        String skillName,
        BigDecimal averageGapScore,
        Integer employeesWithGap,
        LocalDate periodStart,
        LocalDate periodEnd
) {
}