package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeGapResponse;

import java.util.List;

public interface KnowledgeGapService {

    List<KnowledgeGapResponse> getAllKnowledgeGaps();

    KnowledgeGapResponse getKnowledgeGapById(Long id);

    List<KnowledgeGapResponse> getKnowledgeGapsByUser(Long userId);

    List<KnowledgeGapResponse> getKnowledgeGapsBySkill(Long skillId);

    void recalculateGap(Long userId, Long skillId);

    void deleteKnowledgeGap(Long id);

}