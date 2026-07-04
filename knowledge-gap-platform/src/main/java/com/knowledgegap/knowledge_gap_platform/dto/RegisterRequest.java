package com.knowledgegap.knowledge_gap_platform.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private  String fullName;
    private String email;
    private String password;
}
