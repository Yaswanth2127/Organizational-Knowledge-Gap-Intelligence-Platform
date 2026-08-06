package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssessmentStatisticsResponse {
    private long totalAssessments;
    private long pendingAssessments;
    private long passedAssessments;
    private long failedAssessments;
    private long approvedAssessments;
    private long rejectedAssessments;

    private double averageScore;
    private double passRate;
}
