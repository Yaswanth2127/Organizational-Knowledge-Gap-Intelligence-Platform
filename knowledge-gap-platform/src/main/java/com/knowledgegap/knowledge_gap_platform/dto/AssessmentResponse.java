package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentResponse {

    private Long id;

    private Long userId;
    private String userName;

    private Long courseId;
    private String courseTitle;

    private Long skillId;
    private String skillName;

    private String title;

    private BigDecimal score;

    private BigDecimal passingScore;

    private Boolean passed;

    private LocalDateTime assessedAt;
}