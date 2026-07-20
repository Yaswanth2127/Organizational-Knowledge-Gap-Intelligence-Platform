package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.enums.CourseDifficulty;
import com.knowledgegap.knowledge_gap_platform.enums.CourseSource;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {

    private Long id;

    private String title;

    private String description;

    private Long skillId;

    private String skillName;

    private CourseSource source;

    private String provider;

    private String externalUrl;

    private BigDecimal durationHours;

    private CourseDifficulty difficulty;

    private String thumbnailUrl;

    private Boolean isActive;

    private LocalDateTime createdAt;
}