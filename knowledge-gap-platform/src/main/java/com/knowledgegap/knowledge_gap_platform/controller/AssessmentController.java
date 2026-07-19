package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.AssessmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AssessmentResponse;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssessmentResponse createAssessment(
            @Valid @RequestBody AssessmentRequest request) {

        return assessmentService.createAssessment(request);
    }

    @GetMapping("/{id}")
    public AssessmentResponse getAssessmentById(@PathVariable Long id) {

        return assessmentService.getAssessmentById(id);
    }

    @GetMapping
    public List<AssessmentResponse> getAllAssessments() {

        return assessmentService.getAllAssessments();
    }

    @GetMapping("/user/{userId}")
    public List<AssessmentResponse> getAssessmentsByUser(
            @PathVariable Long userId) {

        return assessmentService.getAssessmentsByUser(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<AssessmentResponse> getAssessmentsByCourse(
            @PathVariable Long courseId) {

        return assessmentService.getAssessmentsByCourse(courseId);
    }

    @GetMapping("/skill/{skillId}")
    public List<AssessmentResponse> getAssessmentsBySkill(
            @PathVariable Long skillId) {

        return assessmentService.getAssessmentsBySkill(skillId);
    }

    @PutMapping("/{id}")
    public AssessmentResponse updateAssessment(
            @PathVariable Long id,
            @Valid @RequestBody AssessmentRequest request) {

        return assessmentService.updateAssessment(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssessment(@PathVariable Long id) {

        assessmentService.deleteAssessment(id);
    }
}