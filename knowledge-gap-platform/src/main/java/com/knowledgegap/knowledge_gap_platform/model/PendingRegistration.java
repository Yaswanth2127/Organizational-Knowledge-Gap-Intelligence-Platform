package com.knowledgegap.knowledge_gap_platform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PendingRegistration {
    private String fullName;
    private String email;
    private String password;
    private String otp;
}
