package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.AssessmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AssessmentResponse;

import java.util.List;

public interface AssessmentService {

    AssessmentResponse createAssessment(AssessmentRequest request);

    AssessmentResponse getAssessmentById(Long id);

    List<AssessmentResponse> getAllAssessments();

    List<AssessmentResponse> getAssessmentsByUser(Long userId);

    List<AssessmentResponse> getAssessmentsByCourse(Long courseId);

    List<AssessmentResponse> getAssessmentsBySkill(Long skillId);

    AssessmentResponse updateAssessment(Long id, AssessmentRequest request);

    void deleteAssessment(Long id);
}