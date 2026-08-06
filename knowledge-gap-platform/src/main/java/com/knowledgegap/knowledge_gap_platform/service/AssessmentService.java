package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.*;

import java.util.List;

public interface AssessmentService {

    AssessmentResponse createAssessment(AssessmentCreateRequest request);

    AssessmentResponse submitAssessment(AssessmentSubmitRequest request);

    AssessmentResponse approveAssessment(AssessmentApprovalRequest request);


    AssessmentResponse getAssessmentById(Long id);

    List<AssessmentResponse> getAllAssessments();

    List<AssessmentResponse> getCurrentUserAssessments();


    List<AssessmentResponse> getAssessmentsBySkill(Long skillId);

    List<AssessmentResponse> getPendingAssessments();

    List<AssessmentResponse> getPendingApprovals();

    List<AssessmentResponse> getMyAssessmentHistory();

    AssessmentStatisticsResponse getAssessmentStatistics();
}