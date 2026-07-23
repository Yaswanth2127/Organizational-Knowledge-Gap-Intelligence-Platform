package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentApprovalRequest;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentCreateRequest;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentResponse;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentSubmitRequest;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssessmentResponse createAssessment(
            @Valid @RequestBody AssessmentCreateRequest request) {

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

        return assessmentService.getAssessmentsByUserId(userId);
    }


    @GetMapping("/skill/{skillId}")
    public List<AssessmentResponse> getAssessmentsBySkill(
            @PathVariable Long skillId) {

        return assessmentService.getAssessmentsBySkill(skillId);
    }
    @PostMapping("/submit")
    public AssessmentResponse submitAssessment(
            @Valid @RequestBody AssessmentSubmitRequest request) {

        return assessmentService.submitAssessment(request);
    }

    @PatchMapping("/approve")
    public AssessmentResponse approveAssessment(
            @Valid @RequestBody AssessmentApprovalRequest request) {

        return assessmentService.approveAssessment(request);
    }

    @GetMapping("/pending")
    public List<AssessmentResponse> getPendingAssessments() {

        return assessmentService.getPendingAssessments();
    }

    @GetMapping("/pending-approvals")
    public List<AssessmentResponse> getPendingApprovals() {

        return assessmentService.getPendingApprovals();
    }

    @GetMapping("/history/{userId}")
    public List<AssessmentResponse> getAssessmentHistory(
            @PathVariable Long userId) {

        return assessmentService.getAssessmentHistoryByUserId(userId);
    }


}

