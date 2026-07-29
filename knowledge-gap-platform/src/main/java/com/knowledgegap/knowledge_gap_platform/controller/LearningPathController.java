package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathResponse;
import com.knowledgegap.knowledge_gap_platform.service.LearningPathService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-paths")
@RequiredArgsConstructor
public class LearningPathController {

    private final LearningPathService learningPathService;



    @GetMapping("/{id}")
    public ResponseEntity<LearningPathResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                learningPathService.getById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<LearningPathResponse>> getAll() {

        return ResponseEntity.ok(
                learningPathService.getAll()
        );
    }

    @GetMapping("/user/email/{email}")
    public ResponseEntity<LearningPathResponse> getCurrentLearningPathByUserId(@PathVariable String email){
        return ResponseEntity.ok(learningPathService.getCurrentLearningPathByUserEmail(email));
    }

    @GetMapping("/user/{userId}/history")
    public ResponseEntity<List<LearningPathResponse>> getLearningPathHistoryByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(learningPathService.getLearningPathByUserId(userId));
    }


}