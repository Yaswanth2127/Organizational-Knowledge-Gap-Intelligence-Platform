package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.*;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/my")
    public List<AssessmentResponse> getMyAssessments(
           ) {

        return assessmentService.getCurrentUserAssessments();
    }


    @GetMapping("/skill/{skillId}")
    public List<AssessmentResponse> getAssessmentsBySkill(
            @PathVariable Long skillId) {

        return assessmentService.getAssessmentsBySkill(skillId);
    }
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping("/submit")
    public AssessmentResponse submitAssessment(
            @Valid @RequestBody AssessmentSubmitRequest request) {

        return assessmentService.submitAssessment(request);
    }

    @PreAuthorize("hasAnyRole('SYS_ADMIN','MANAGER')")
    @PatchMapping("/approve")
    public AssessmentResponse approveAssessment(
            @Valid @RequestBody AssessmentApprovalRequest request) {

        return assessmentService.approveAssessment(request);
    }

    @PreAuthorize("hasAnyRole('SYS_ADMIN','MANAGER')")
    @GetMapping("/pending")
    public List<AssessmentResponse> getPendingAssessments() {

        return assessmentService.getPendingAssessments();
    }

    @PreAuthorize("hasAnyRole('SYS_ADMIN','MANAGER')")
    @GetMapping("/pending-approvals")
    public List<AssessmentResponse> getPendingApprovals() {

        return assessmentService.getPendingApprovals();
    }

    @GetMapping("/history")
    public List<AssessmentResponse> getAssessmentHistory() {

        return assessmentService.getMyAssessmentHistory();
    }

    @PreAuthorize("hasAnyRole(" +
            "'SYS_ADMIN','MANAGER')")
    @GetMapping("/statistics")
    public AssessmentStatisticsResponse getAssessmentStatistics(){
        return assessmentService.getAssessmentStatistics();
    }


}

