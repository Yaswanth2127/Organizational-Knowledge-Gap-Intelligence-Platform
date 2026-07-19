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

    @PostMapping
    public ResponseEntity<LearningPathResponse> create(
            @Valid @RequestBody LearningPathRequest request) {

        return new ResponseEntity<>(
                learningPathService.create(request),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPathResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody LearningPathRequest request) {

        return ResponseEntity.ok(
                learningPathService.update(id, request)
        );
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        learningPathService.delete(id);

        return ResponseEntity.ok("Learning Path deleted successfully.");
    }
}