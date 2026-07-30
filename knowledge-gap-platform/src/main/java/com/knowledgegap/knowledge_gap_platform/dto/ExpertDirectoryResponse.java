package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpertDirectoryResponse {
    private Long id;

    private Long userId;

    private String employeeName;

    private String employeeEmail;

    private Long skillId;

    private String skillName;

    private ProficiencyLevel expertiseLevel;

    private Integer endorsementCount;

    private LocalDateTime createdAt;
}
