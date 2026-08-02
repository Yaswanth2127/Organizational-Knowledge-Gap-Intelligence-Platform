package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleResponse;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeArticle;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeArticleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeArticleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KnowledgeArticleServiceImpl implements KnowledgeArticleService {

    private final KnowledgeArticleRepository knowledgeArticleRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public KnowledgeArticleResponse createArticle(KnowledgeArticleRequest request) {

        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Author not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        KnowledgeArticle article = KnowledgeArticle.builder()
                .author(author)
                .skill(skill)
                .title(request.getTitle())
                .content(request.getContent())
                .resourceUrl(request.getResourceUrl())
                .build();

        article = knowledgeArticleRepository.save(article);

        return mapToResponse(article);
    }

    @Override
    public KnowledgeArticleResponse updateArticle(Long id,
                                                  KnowledgeArticleRequest request) {

        KnowledgeArticle article = knowledgeArticleRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Article not found"));

        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Author not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        article.setAuthor(author);
        article.setSkill(skill);
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setResourceUrl(request.getResourceUrl());

        article = knowledgeArticleRepository.save(article);

        return mapToResponse(article);
    }

    @Override
    public void deleteArticle(Long id) {

        KnowledgeArticle article = knowledgeArticleRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Article not found"));

        knowledgeArticleRepository.delete(article);
    }

    @Override
    public KnowledgeArticleResponse getArticleById(Long id) {

        KnowledgeArticle article = knowledgeArticleRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Article not found"));

        return mapToResponse(article);
    }

    @Override
    public List<KnowledgeArticleResponse> getAllArticles() {

        return knowledgeArticleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<KnowledgeArticleResponse> getArticlesByAuthor(Long authorId) {

        User author = userRepository.findById(authorId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Author not found"));

        return knowledgeArticleRepository.findByAuthor(author)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<KnowledgeArticleResponse> getArticlesBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        return knowledgeArticleRepository.findBySkill(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<KnowledgeArticleResponse> searchByTitle(String title) {

        return knowledgeArticleRepository
                .findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private KnowledgeArticleResponse mapToResponse(KnowledgeArticle article) {

        return KnowledgeArticleResponse.builder()
                .id(article.getId())

                .authorId(article.getAuthor().getId())
                .authorName(article.getAuthor().getFullName())

                .skillId(article.getSkill().getId())
                .skillName(article.getSkill().getName())

                .title(article.getTitle())
                .content(article.getContent())
                .resourceUrl(article.getResourceUrl())

                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())

                .build();
    }
}