package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseResponse;
import com.knowledgegap.knowledge_gap_platform.service.LearningPathCourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-path-courses")
@RequiredArgsConstructor
public class LearningPathCourseController {

    private final LearningPathCourseService learningPathCourseService;

    @PostMapping
    public ResponseEntity<LearningPathCourseResponse> create(
            @Valid @RequestBody LearningPathCourseRequest request) {

        return new ResponseEntity<>(
                learningPathCourseService.create(request),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPathCourseResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody LearningPathCourseRequest request) {

        return ResponseEntity.ok(
                learningPathCourseService.update(id, request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPathCourseResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                learningPathCourseService.getById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<LearningPathCourseResponse>> getAll() {

        return ResponseEntity.ok(
                learningPathCourseService.getAll()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        learningPathCourseService.delete(id);

        return ResponseEntity.ok("Learning Path Course deleted successfully.");
    }

    @GetMapping("/learning-path/{learningPathId}")
    public ResponseEntity<List<LearningPathCourseResponse>> getByLearningPathId(
            @PathVariable Long learningPathId) {

        return ResponseEntity.ok(
                learningPathCourseService.getByLearningPathId(learningPathId)
        );
    }
}