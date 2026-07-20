package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSkillRequest {

    private Long userId;

    private Long skillId;

    private ProficiencyLevel selfRating;

    private ProficiencyLevel peerRating;

    private ProficiencyLevel managerRating;

    private ProficiencyLevel finalRating;
}