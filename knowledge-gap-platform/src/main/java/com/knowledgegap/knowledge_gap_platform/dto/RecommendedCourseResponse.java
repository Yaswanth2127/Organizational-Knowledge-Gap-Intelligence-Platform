package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendedCourseResponse {
    private CourseResponse course;

    private BigDecimal relevanceScore;

    private String reason;

    private Integer sequenceOrder;
}
