package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompetencyFrameworkResponse {
    private Long id;

    private Long jobRoleId;

    private Long departmentId;

    private Integer version;

    private Boolean isActive;

    private Long createdById;
}
