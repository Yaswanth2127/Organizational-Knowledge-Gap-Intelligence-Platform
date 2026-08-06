package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSkillStatisticsResponse {
    private Long totalSkills;

    private Long beginner;

    private Long intermediate;

    private Long advanced;

    private Long expert;
}
