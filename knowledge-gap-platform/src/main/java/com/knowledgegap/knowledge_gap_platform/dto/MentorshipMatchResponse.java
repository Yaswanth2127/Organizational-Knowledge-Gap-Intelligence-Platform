package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MentorshipMatchResponse {
    private Long id;

    private Long mentorId;
    private String mentorName;

    private Long menteeId;
    private String menteeName;

    private Long skillId;
    private String skillName;

    private MentorshipStatus status;

    private LocalDateTime matchedAt;
    private LocalDateTime endedAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
