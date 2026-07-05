package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.SkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillResponse;

import java.util.List;

public interface SkillService {
    SkillResponse addSkill(SkillRequest skillRequest);
    List<SkillResponse> getAllSkills();
    SkillResponse getSkillById(Long id);
    SkillResponse updateSkill(Long id,SkillRequest skillRequest);
    void deleteSkillById(Long id);
}
