package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSkillResponse {

    private Long id;

    private Long userId;
    private String userName;
    private String profileImageUrl;

    private Long departmentId;
    private String departmentName;

    private Long jobRoleId;
    private String jobRoleName;

    private Long skillId;
    private String skillName;


    private ProficiencyLevel selfRating;
    private ProficiencyLevel peerRating;
    private ProficiencyLevel managerRating;
    private ProficiencyLevel finalRating;

    private LocalDateTime lastAssessedAt;
}