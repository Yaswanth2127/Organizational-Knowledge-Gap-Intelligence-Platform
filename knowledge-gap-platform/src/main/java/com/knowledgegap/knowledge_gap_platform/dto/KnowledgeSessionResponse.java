package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KnowledgeSessionResponse {
    private Long id;

    private Long hostId;
    private String hostName;

    private String title;

    private Long topicSkillId;
    private String skillName;

    private LocalDateTime scheduledAt;
    private LocalDateTime endedAt;

    private String locationLink;

    private SessionStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
