package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.QuestionResponse;

import java.util.List;

public interface QuestionService {
    List<QuestionResponse> getQuestionsByAssessment(Long assessmentId);

    QuestionResponse getQuestionById(Long questionId);
}
