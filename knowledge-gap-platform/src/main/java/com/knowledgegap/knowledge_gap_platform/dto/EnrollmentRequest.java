package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.enums.TrainingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long courseId;

    private TrainingStatus status;

    private BigDecimal progressPercent;
}