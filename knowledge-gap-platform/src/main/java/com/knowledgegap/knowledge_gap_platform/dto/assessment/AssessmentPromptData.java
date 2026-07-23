package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;

public record AssessmentPromptData(String skillName,
                                   ProficiencyLevel currentLevel,
                                   ProficiencyLevel requiredLevel,
                                   Double gapScore,
                                   GapSeverity severity) {
}
