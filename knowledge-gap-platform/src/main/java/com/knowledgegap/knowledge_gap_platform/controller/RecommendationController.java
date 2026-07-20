package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.RecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping
    public ResponseEntity<RecommendationResponse> createRecommendation(
            @Valid @RequestBody RecommendationRequest request
    ) {

        return new ResponseEntity<>(
                recommendationService.createRecommendation(request),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecommendationResponse> updateRecommendation(
            @PathVariable Long id,
            @Valid @RequestBody RecommendationRequest request
    ) {

        return ResponseEntity.ok(
                recommendationService.updateRecommendation(id, request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationResponse> getRecommendationById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                recommendationService.getRecommendationById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<RecommendationResponse>> getAllRecommendations() {

        return ResponseEntity.ok(
                recommendationService.getAllRecommendations()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecommendation(
            @PathVariable Long id
    ) {

        recommendationService.deleteRecommendation(id);

        return ResponseEntity.ok("Recommendation deleted successfully.");
    }
}