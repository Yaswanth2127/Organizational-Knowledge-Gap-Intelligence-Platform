package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.ArticleDeletionRequest;
import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Certification;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeArticle;

public interface NotificationHelper {
    void notifyAssessmentApproved(Assessment assessment);

    void notifyAssessmentRejected(Assessment assessment);
    void notifyCertificationExpiring(Certification certification,Long days);

    void notifyCertificationExpired(Certification certification);

    void articleDeletionByAdmin(KnowledgeArticle knowledgeArticle, ArticleDeletionRequest request);
}
