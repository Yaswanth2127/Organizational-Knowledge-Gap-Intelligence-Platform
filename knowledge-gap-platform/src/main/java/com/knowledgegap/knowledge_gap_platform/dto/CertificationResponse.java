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

    // User details
    private Long userId;
    private String userName;

    // Skill details
    private Long skillId;
    private String skillName;

    // Certification details
    private String name;
    private String issuer;

    // Certificate links
    private String credentialUrl;
    private String fileUrl;

    // Dates
    private LocalDate issueDate;
    private LocalDate expiryDate;
}