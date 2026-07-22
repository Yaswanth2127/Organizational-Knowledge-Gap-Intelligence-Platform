package com.knowledgegap.knowledge_gap_platform.dto.ai;

import com.knowledgegap.knowledge_gap_platform.dto.SkillRecommendationResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AIRecommendationResponse {
    private String summary;

    private List<SkillRecommendationResponse> recommendations;

}
