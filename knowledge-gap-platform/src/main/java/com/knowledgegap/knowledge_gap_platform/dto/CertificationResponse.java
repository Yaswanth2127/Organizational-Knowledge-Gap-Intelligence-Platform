package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificationResponse {
    private Long id;
    private Long userId;
    private String userName;

    private Long skillId;
    private String skillName;
    private String name;
    private String issuer;
    private String credentialUrl;
    private String fileUrl;
    private LocalDate issueDate;
    private LocalDate expiryDate;
}
