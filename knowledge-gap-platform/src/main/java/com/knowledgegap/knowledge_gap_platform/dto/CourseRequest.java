package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.enums.CourseDifficulty;
import com.knowledgegap.knowledge_gap_platform.enums.CourseSource;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Course title is required")
    private String title;

    private String description;

    @NotNull(message = "Skill Id is required")
    private Long skillId;

    @NotNull(message = "Course source is required")
    private CourseSource source;

    private String provider;

    private String externalUrl;

    private BigDecimal durationHours;

    private CourseDifficulty difficulty;

    private String thumbnailUrl;

    private Boolean isActive;
}