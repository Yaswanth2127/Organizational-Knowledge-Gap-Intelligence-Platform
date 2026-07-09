package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.model.PendingRegistration;



public interface RedisService {
    void savePendingRegistration(PendingRegistration pendingRegistration);
    PendingRegistration getPendingRegistration(String  email);
    void deletePendingRegistration(String email);
}
