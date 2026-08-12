package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.ArticleDeletionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleResponse;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge-articles")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KnowledgeArticleController {

    private final KnowledgeArticleService knowledgeArticleService;

    // =========================================================
    // CREATE
    // Employee creates an article.
    // Author is taken from the authenticated user.
    // =========================================================

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ResponseStatus(HttpStatus.CREATED)
    public KnowledgeArticleResponse createArticle(
            @Valid @RequestBody KnowledgeArticleRequest request) {

        return knowledgeArticleService.createArticle(request);
    }

    // =========================================================
    // UPDATE OWN ARTICLE
    // Employee can update only their own article.
    // Ownership is checked in the service.
    // =========================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public KnowledgeArticleResponse updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody KnowledgeArticleRequest request) {

        return knowledgeArticleService.updateArticle(id, request);
    }

    // =========================================================
    // DELETE OWN ARTICLE
    // Employee can delete only their own article.
    // Ownership is checked in the service.
    // =========================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwnArticle(
            @PathVariable Long id) {

        knowledgeArticleService.deleteOwnArticle(id);
    }

    // =========================================================
    // HR / ADMIN DELETE ANY ARTICLE
    // HR and Admin can delete an article regardless of author.
    // =========================================================

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('HR_SPECIALIST', 'SYS_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArticleAsAdmin(
            @PathVariable Long id, @RequestBody ArticleDeletionRequest request) {

        knowledgeArticleService.deleteArticleByAdmin(id,request);
    }

    // =========================================================
    // GET ARTICLE BY ID
    // =========================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public KnowledgeArticleResponse getArticleById(
            @PathVariable Long id) {

        return knowledgeArticleService.getArticleById(id);
    }

    // =========================================================
    // GET ALL ARTICLES
    // =========================================================

    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public List<KnowledgeArticleResponse> getAllArticles() {

        return knowledgeArticleService.getAllArticles();
    }

    // =========================================================
    // GET ARTICLES BY AUTHOR
    // =========================================================

    @GetMapping("/author/{authorId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public List<KnowledgeArticleResponse> getArticlesByAuthor(
            @PathVariable Long authorId) {

        return knowledgeArticleService.getArticlesByAuthor(authorId);
    }

    // =========================================================
    // GET ARTICLES BY SKILL
    // =========================================================

    @GetMapping("/skill/{skillId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public List<KnowledgeArticleResponse> getArticlesBySkill(
            @PathVariable Long skillId) {

        return knowledgeArticleService.getArticlesBySkill(skillId);
    }

    // =========================================================
    // SEARCH BY TITLE
    // =========================================================

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public List<KnowledgeArticleResponse> searchByTitle(
            @RequestParam String title) {

        return knowledgeArticleService.searchByTitle(title);
    }
}