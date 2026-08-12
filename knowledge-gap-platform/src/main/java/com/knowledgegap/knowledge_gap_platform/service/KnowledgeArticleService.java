package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.ArticleDeletionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleResponse;

import java.util.List;

public interface KnowledgeArticleService {
    KnowledgeArticleResponse createArticle(KnowledgeArticleRequest request);

    KnowledgeArticleResponse updateArticle(Long id, KnowledgeArticleRequest request);

    void deleteOwnArticle(Long id);

    KnowledgeArticleResponse getArticleById(Long id);

    List<KnowledgeArticleResponse> getAllArticles();

    List<KnowledgeArticleResponse> getArticlesByAuthor(Long authorId);

    List<KnowledgeArticleResponse> getArticlesBySkill(Long skillId);

    List<KnowledgeArticleResponse> searchByTitle(String title);

    void deleteArticleByAdmin(Long id, ArticleDeletionRequest request);
}
