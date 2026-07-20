package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.RecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RecommendationResponse;

import java.util.List;

public interface RecommendationService {

    RecommendationResponse createRecommendation(RecommendationRequest request);

    RecommendationResponse updateRecommendation(Long id, RecommendationRequest request);

    RecommendationResponse getRecommendationById(Long id);

    List<RecommendationResponse> getAllRecommendations();

    void deleteRecommendation(Long id);
}