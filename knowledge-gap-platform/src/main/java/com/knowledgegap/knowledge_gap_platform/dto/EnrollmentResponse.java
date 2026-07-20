package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.TrainingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long courseId;

    private String courseTitle;

    private TrainingStatus status;

    private BigDecimal progressPercent;

    private LocalDateTime enrolledAt;

    private LocalDateTime lastAccessedAt;

    private LocalDateTime completedAt;
}