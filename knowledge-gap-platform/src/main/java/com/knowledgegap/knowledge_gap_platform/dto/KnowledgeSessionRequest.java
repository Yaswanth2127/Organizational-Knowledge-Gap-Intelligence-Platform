package com.knowledgegap.knowledge_gap_platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Session title is required")
    private String title;

    @NotNull(message = "Topic skill is required")
    private Long topicSkillId;

    @NotNull(message = "Scheduled date and time is required")
    private LocalDateTime scheduledAt;

    @NotNull(message = "Session end date and time is required")
    private LocalDateTime endedAt;

    private String locationLink;

}
