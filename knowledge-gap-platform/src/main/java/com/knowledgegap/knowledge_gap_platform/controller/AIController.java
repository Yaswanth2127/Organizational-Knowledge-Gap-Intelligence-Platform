package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.client.GeminiClient;

import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ai.AIRecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.security.CustomUserDetails;
import com.knowledgegap.knowledge_gap_platform.service.AIService;
import com.sun.security.auth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/recommendation/analyze/{userId}")
    public ResponseEntity<AIRecommendationResponse> getAIAnalysis(@PathVariable Long userId){
        return ResponseEntity.ok(aiService.generateRecommendation(new AIRecommendationRequest(userId)));
    }

    @GetMapping("/recommendation")
    public ResponseEntity<AIRecommendationResponse> getRecommendation(
            Authentication authentication) {
        CustomUserDetails principal =
                (CustomUserDetails) authentication.getPrincipal();

        Long userId =principal.getUser().getId();

        return ResponseEntity.ok(aiService.getRecommendation(userId));
    }

}

