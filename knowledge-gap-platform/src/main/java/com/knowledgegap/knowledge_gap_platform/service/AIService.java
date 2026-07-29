package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentPromptData;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.GeneratedAssessment;

public interface AIService {
    AIRecommendationResponse generateRecommendation(AIRecommendationRequest aiRecommendationRequest);
    GeneratedAssessment generateAssessment(AssessmentPromptData data);
    AIRecommendationResponse getRecommendation(Long userId);
}
