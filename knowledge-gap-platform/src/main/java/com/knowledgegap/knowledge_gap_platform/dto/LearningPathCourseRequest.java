package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPathCourseRequest {

    @NotNull
    private Long learningPathId;

    @NotNull
    private Long courseId;

    @NotNull
    private Integer sequenceOrder;

    private Integer estimatedDays;
}