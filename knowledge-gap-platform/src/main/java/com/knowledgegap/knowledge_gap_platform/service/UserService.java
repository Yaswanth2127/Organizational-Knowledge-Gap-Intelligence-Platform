package com.knowledgegap.knowledge_gap_platform.service;


import com.knowledgegap.knowledge_gap_platform.dto.RegisterRequest;
import com.knowledgegap.knowledge_gap_platform.dto.UserResponse;

public interface UserService{
    UserResponse Register(RegisterRequest request);
}
