package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathResponse;

import java.util.List;

public interface LearningPathService {

    LearningPathResponse create(LearningPathRequest request);

    LearningPathResponse update(Long id, LearningPathRequest request);

    LearningPathResponse getById(Long id);

    List<LearningPathResponse> getAll();

    void delete(Long id);
}