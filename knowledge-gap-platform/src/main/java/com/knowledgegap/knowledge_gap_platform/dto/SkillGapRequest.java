package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SkillGapRequest {
    @NotNull
    private Long userId;
}
