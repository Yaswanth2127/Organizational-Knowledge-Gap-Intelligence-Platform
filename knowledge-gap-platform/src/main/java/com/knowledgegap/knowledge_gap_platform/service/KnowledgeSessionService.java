package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;

import java.util.List;

public interface KnowledgeSessionService {
    KnowledgeSessionResponse createSession(KnowledgeSessionRequest request);

    KnowledgeSessionResponse updateSession(Long id,
                                           KnowledgeSessionRequest request);

    void deleteSession(Long id);

    KnowledgeSessionResponse getSessionById(Long id);

    List<KnowledgeSessionResponse> getSessionsByHost(Long hostId);

    List<KnowledgeSessionResponse> getSessionsBySkill(Long skillId);

    List<KnowledgeSessionResponse> getSessionsByStatus(SessionStatus status);
}
