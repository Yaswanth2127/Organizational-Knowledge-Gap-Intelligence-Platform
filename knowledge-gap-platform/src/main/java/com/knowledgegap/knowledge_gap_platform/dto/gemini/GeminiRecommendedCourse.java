package com.knowledgegap.knowledge_gap_platform.dto.gemini;

import com.knowledgegap.knowledge_gap_platform.entity.enums.CourseSource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeminiRecommendedCourse {
    private Long courseId;

    private String title;

    private String provider;

    private CourseSource source;

    private String externalUrl;

    private BigDecimal relevanceScore;

    private String reason;

    private Integer sequenceOrder;
}
