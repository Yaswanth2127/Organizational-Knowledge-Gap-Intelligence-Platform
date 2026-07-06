package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillResponse;

import java.util.List;

public interface EmployeeSkillService {

    EmployeeSkillResponse addEmployeeSkill(EmployeeSkillRequest request);

    List<EmployeeSkillResponse> getAllEmployeeSkills();

    EmployeeSkillResponse getEmployeeSkillById(Long id);

    EmployeeSkillResponse updateEmployeeSkill(Long id,
                                              EmployeeSkillRequest request);

    void deleteEmployeeSkill(Long id);
}