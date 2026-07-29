package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseResponse;

import java.util.List;

public interface LearningPathCourseService {

    LearningPathCourseResponse create(LearningPathCourseRequest request);

    LearningPathCourseResponse update(Long id, LearningPathCourseRequest request);

    LearningPathCourseResponse getById(Long id);

    List<LearningPathCourseResponse> getAll();

    void delete(Long id);

    List<LearningPathCourseResponse> getByLearningPathId(Long learningPathId);
}