package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSkillResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long skillId;

    private String skillName;

    private ProficiencyLevel selfRating;

    private ProficiencyLevel peerRating;

    private ProficiencyLevel managerRating;

    private ProficiencyLevel finalRating;
}