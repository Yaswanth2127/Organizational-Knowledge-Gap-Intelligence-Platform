package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;

import java.util.List;

public interface SkillGapService {
    List<SkillGapResponse> analyzeSkillGap(SkillGapRequest skillGapRequest);
    List<SkillGapResponse> FindAllByUserDepartmentId(Long deptId);

}
