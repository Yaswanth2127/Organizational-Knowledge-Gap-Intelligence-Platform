package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentScheduleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentScheduleResponse;

import java.util.List;

public interface AssessmentScheduleService {

    AssessmentScheduleResponse createSchedule(
            AssessmentScheduleRequest request);

    AssessmentScheduleResponse getScheduleById(Long id);

    List<AssessmentScheduleResponse> getAllSchedules();

    List<AssessmentScheduleResponse> getSchedulesByUser(Long userId);

    List<AssessmentScheduleResponse> getSchedulesByCourse(Long courseId);

    List<AssessmentScheduleResponse> getSchedulesBySkill(Long skillId);

    List<AssessmentScheduleResponse> getCompletedSchedules();

    List<AssessmentScheduleResponse> getPendingSchedules();

    AssessmentScheduleResponse updateSchedule(
            Long id,
            AssessmentScheduleRequest request);

    void markCompleted(Long id);

    void deleteSchedule(Long id);
}