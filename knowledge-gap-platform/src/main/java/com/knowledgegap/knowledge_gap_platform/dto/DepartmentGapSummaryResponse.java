package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentGapSummaryResponse {
        private Long id;

        private Long departmentId;
        private String departmentName;

        private Long skillId;
        private String skillName;

        private BigDecimal avgGapScore;

        private Integer employeesWithGap=0;

        private LocalDate periodStart;

        private LocalDate periodEnd;
}
