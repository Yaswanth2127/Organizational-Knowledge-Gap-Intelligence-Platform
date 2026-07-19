package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long courseId;

    @NotNull
    private Long skillId;

    @NotBlank
    private String title;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private BigDecimal score;

    @Builder.Default
    private BigDecimal passingScore = BigDecimal.valueOf(70);

    @Builder.Default
    private Boolean passed = false;
}