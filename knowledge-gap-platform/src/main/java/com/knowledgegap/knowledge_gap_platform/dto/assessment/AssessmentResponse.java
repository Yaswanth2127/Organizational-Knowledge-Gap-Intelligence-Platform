package com.knowledgegap.knowledge_gap_platform.dto.assessment;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentResponse {

    private Long id;

    private Long userId;
    private String userName;

    private Long skillId;
    private String skillName;

    private String title;

    private BigDecimal score;

    private BigDecimal passingScore;

    private Boolean passed;
    private AssessmentStatus status;


    private Long approvedById;
    private String approvedByName;

    private LocalDateTime approvedAt;

    private String remarks;

    private LocalDateTime assessedAt;
}