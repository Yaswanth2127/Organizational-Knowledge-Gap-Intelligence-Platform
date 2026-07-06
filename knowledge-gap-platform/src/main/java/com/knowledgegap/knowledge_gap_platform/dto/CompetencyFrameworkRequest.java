package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompetencyFrameworkRequest {
    private Long jobRoleId;

    private Long departmentId;


    private Long createdById;
}
