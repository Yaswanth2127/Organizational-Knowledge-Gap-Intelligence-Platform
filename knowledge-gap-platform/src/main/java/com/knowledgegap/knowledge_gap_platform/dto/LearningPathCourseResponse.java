package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPathCourseResponse {

    private Long id;

    private Long learningPathId;

    private Long courseId;

    private String courseTitle;

    private Integer sequenceOrder;

    private Integer estimatedDays;
}