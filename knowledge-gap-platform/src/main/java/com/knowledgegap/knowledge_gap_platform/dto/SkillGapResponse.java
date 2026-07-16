package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.GapStatus;
import com.knowledgegap.knowledge_gap_platform.entity.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillGapResponse {
    private Long skillGapId;

    private String employeeName;

    private Long userId;

    private String skillName;

    private ProficiencyLevel requiredLevel;

    private ProficiencyLevel currentLevel;

    private BigDecimal gapScore;

    private GapSeverity severity;

    private GapStatus status;

    private LocalDateTime detectedAt;
}
