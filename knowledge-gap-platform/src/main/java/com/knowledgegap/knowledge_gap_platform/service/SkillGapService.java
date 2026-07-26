package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AnalysisTrigger;

import java.util.List;

public interface SkillGapService {
    List<SkillGapResponse> getSkillGapsByUserId(Long userId);
    List<SkillGapResponse> analyzeSkillGap(SkillGapRequest skillGapRequest, AnalysisTrigger analysisTrigger);
    List<SkillGapResponse> FindAllByUserDepartmentId(Long deptId);
    void updateAllByUserDepartmentId(Long deptId);

}
