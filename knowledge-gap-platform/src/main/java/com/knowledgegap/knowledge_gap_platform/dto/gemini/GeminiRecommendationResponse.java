package com.knowledgegap.knowledge_gap_platform.dto.gemini;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeminiRecommendationResponse {
    private String summary;

    private List<GeminiSkillRecommendation> recommendations;
}
