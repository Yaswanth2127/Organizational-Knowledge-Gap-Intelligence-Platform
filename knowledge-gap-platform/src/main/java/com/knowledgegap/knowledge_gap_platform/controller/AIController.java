package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.client.GeminiClient;

import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AIController {
    private final GeminiClient geminiClient;
    private final AIService aiService;

    @GetMapping("/test")
    public String test(){
        return geminiClient.generateContent("Hello i need a help regarding our project ");
    }

    @GetMapping("/recommendation/{userId}")
    public ResponseEntity<AIRecommendationResponse> getAIAnalysis(@PathVariable Long userId){
        return ResponseEntity.ok(aiService.generateRecommendation(new AIRecommendationRequest(userId)));
    }

}

