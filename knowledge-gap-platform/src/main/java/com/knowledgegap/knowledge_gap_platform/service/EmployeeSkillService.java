package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.*;

import java.util.List;

public interface EmployeeSkillService {

    EmployeeSkillResponse addEmployeeSkill(EmployeeSkillRequest request);

    List<EmployeeSkillResponse> getAllEmployeeSkills();

    EmployeeSkillResponse getEmployeeSkillById(Long id);

    EmployeeSkillResponse updateEmployeeSkill(Long id,
                                              EmployeeSkillRequest request);
    void deleteEmployeeSkillById(Long id);
    List<EmployeeSkillResponse> getEmployeeSkillsByUserId(Long userId);


    List<EmployeeSkillResponse> getMySkills();

    List<EmployeeSkillResponse> getEligiblePeerReviews();

    EmployeeSkillResponse submitPeerReview(Long id, EmployeeSkillReviewRequest request);

    EmployeeSkillStatisticsResponse getStatistics();
    EmployeeSkillResponse assignSkill(Long userId,EmployeeSkillRequest request);
}