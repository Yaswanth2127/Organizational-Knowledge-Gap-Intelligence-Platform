package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;

    private String fullName;

    private String email;

    private Long departmentId;
    private String departmentName;

    private Long jobRoleId;
    private String jobRoleName;

    private Long managerId;
    private String managerName;

    private String phoneNumber;

    private String profileImageUrl;

    private Boolean isActive;

    private Boolean emailVerified;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<String> roles;
}
