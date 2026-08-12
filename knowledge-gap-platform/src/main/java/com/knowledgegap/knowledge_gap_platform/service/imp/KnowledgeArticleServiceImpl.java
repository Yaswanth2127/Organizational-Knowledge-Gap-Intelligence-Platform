package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.ArticleDeletionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleResponse;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeArticle;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeArticleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeArticleService;
import com.knowledgegap.knowledge_gap_platform.service.NotificationHelper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class KnowledgeArticleServiceImpl implements KnowledgeArticleService {

    private final KnowledgeArticleRepository knowledgeArticleRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final AuthenticationService authenticationService;
    private final NotificationHelper notificationHelper;

    @Override
    public KnowledgeArticleResponse createArticle(KnowledgeArticleRequest request) {

        User author = authenticationService.getCurrentUser();

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

    @Transactional
    @Override
    public KnowledgeArticleResponse updateArticle(Long id,
                                                  KnowledgeArticleRequest request) {



        User currentUser = authenticationService.getCurrentUser();

        KnowledgeArticle article =
                knowledgeArticleRepository
                        .findByIdAndAuthorId(id, currentUser.getId())
                        .orElseThrow(() ->
                                new AccessDeniedException(
                                        "You are not authorized to update this article."
                                ));


        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));


        article.setSkill(skill);
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setResourceUrl(request.getResourceUrl());

        article = knowledgeArticleRepository.save(article);

        return mapToResponse(article);
    }

    @Override
    public void deleteOwnArticle(Long id) {

        KnowledgeArticle article = knowledgeArticleRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Article not found"));

        User currentUser=authenticationService.getCurrentUser();

        if(!article.getAuthor().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("You are not Authorised to delete this article");
        }

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

    @Override
    public void deleteArticleByAdmin(Long id, ArticleDeletionRequest request) {

        KnowledgeArticle article=knowledgeArticleRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Article not found "));

        notificationHelper.articleDeletionByAdmin(article,request);
        knowledgeArticleRepository.delete(article);


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