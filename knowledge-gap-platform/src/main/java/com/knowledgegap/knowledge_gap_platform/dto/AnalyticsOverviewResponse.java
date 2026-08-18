package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsOverviewResponse {

    private long totalEmployees;

    private long totalSkills;

    private long totalAssessments;

    private long completedAssessments;

    private long totalSkillGaps;

    private long criticalGaps;

    private long totalKnowledgeSessions;

    private long upcomingKnowledgeSessions;
}