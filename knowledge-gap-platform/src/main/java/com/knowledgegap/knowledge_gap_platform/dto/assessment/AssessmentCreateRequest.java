package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentCreateRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long skillId;



}