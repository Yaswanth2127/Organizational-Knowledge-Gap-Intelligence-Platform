package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleDeletionRequest {
    @NotBlank(message = "Deletion reason is required")
    private String reason;
}
