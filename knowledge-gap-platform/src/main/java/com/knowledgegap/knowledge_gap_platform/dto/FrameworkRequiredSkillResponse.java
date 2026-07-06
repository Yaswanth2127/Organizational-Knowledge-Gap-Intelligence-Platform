package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.ProficiencyLevel;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FrameworkRequiredSkillResponse {

    private Long id;

    private Long frameworkId;

    private Long skillId;

    private ProficiencyLevel requiredProficiency;

    private BigDecimal weight;
}