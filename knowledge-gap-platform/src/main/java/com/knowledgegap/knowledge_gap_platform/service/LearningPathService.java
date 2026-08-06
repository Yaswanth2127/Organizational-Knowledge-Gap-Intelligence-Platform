package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathResponse;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;

import java.util.List;

public interface LearningPathService {

    List<LearningPathResponse> getLearningPathByUserId(Long userId);

    LearningPathResponse getCurrentLearningPathByUser();

    LearningPathResponse getById(Long id);

    List<LearningPathResponse> getAll();

}