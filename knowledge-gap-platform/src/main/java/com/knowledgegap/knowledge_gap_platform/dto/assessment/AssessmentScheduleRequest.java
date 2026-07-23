package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentScheduleRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long courseId;

    @NotNull
    private Long skillId;

    @NotBlank
    private String title;

    @NotNull
    @Future
    private LocalDateTime scheduledDate;
}