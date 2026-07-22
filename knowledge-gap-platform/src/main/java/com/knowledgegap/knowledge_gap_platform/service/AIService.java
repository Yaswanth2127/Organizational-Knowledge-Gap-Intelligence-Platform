package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationResponse;

public interface AIService {
    AIRecommendationResponse generateRecommendation(AIRecommendationRequest aiRecommendationRequest);
}
