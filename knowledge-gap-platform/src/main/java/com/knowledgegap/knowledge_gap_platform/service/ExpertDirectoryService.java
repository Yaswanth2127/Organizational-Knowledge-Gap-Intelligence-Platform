package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;

import java.util.List;

public interface ExpertDirectoryService {
    ExpertDirectoryResponse addExpert(ExpertDirectoryRequest request);

    ExpertDirectoryResponse updateExpert(Long id,ExpertDirectoryRequest request);

    void deleteExpert(Long id);

    ExpertDirectoryResponse  getExpertById(Long id);

    List<ExpertDirectoryResponse> getExpertsBySkill(Long skillId);

    List<ExpertDirectoryResponse> getExpertsByUser(Long userId);

    List<ExpertDirectoryResponse> getTop5Experts();

    List<ExpertDirectoryResponse> getExpertsBySkillAndLevel(Long skillId,
            ProficiencyLevel level);
}
