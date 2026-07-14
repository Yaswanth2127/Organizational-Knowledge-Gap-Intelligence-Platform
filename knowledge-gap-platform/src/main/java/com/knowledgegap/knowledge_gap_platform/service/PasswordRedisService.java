package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.model.PasswordResetRequest;

public interface PasswordRedisService {
    void SavePasswordResetRequest(PasswordResetRequest passwordResetRequest);
    PasswordResetRequest getPasswordResetRequest(String email);
    void deletePasswordResetRequest(String email);

}
