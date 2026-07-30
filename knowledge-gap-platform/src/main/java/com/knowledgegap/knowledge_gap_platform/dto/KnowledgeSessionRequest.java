package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KnowledgeSessionRequest {
    private Long hostId;

    private String title;

    private Long topicSkillId;

    private LocalDateTime scheduledAt;

    private String locationLink;

}
