package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SkillRecommendationResponse {
    //private Long skillGapId;

    private String skillName;

    private List<RecommendedCourseResponse> courses;
}
