package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillResponse;

import java.util.List;

public interface FrameworkRequiredSkillService {

    FrameworkRequiredSkillResponse addFrameworkRequiredSkill(
            FrameworkRequiredSkillRequest request);

    List<FrameworkRequiredSkillResponse> getAll();

    FrameworkRequiredSkillResponse getById(Long id);

    FrameworkRequiredSkillResponse update(Long id,
                                          FrameworkRequiredSkillRequest request);

    void delete(Long id);
}