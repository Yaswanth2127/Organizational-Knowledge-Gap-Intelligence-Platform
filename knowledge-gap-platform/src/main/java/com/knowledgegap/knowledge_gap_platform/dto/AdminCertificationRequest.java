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
public class AdminCertificationRequest {

    private Long userId;
    private Long skillId;
    private String name;
    private String issuer;
    private String credentialUrl;
    private String fileUrl;
    private LocalDate issueDate;
    private LocalDate expiryDate;
}
