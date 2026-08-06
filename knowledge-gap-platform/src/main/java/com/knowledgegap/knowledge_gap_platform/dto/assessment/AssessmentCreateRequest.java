package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import jakarta.validation.constraints.NotNull;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentCreateRequest {

    @NotNull
    private Long skillId;



}