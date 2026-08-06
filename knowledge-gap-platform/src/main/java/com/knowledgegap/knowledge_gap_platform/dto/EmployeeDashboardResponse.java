package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDashboardResponse {

    private Integer totalSkills;

    private Integer completedAssessments;

    private Integer certifications;

    private Integer competencyScore;

    private Integer profileCompletion;

}