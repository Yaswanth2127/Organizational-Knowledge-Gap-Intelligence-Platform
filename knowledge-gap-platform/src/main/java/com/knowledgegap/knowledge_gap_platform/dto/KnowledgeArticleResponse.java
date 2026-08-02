package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KnowledgeArticleResponse {

    private Long id;

    private Long authorId;
    private String authorName;

    private Long skillId;
    private String skillName;

    private String title;

    private String content;

    private String resourceUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}