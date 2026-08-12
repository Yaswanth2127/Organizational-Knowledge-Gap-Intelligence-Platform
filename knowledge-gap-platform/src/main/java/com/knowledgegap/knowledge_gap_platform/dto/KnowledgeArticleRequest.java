package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KnowledgeArticleRequest {



    @NotNull
    private Long skillId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private String resourceUrl;
}