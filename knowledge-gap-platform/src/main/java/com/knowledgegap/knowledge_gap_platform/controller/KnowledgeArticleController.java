package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeArticleResponse;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge-articles")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KnowledgeArticleController {

    private final KnowledgeArticleService knowledgeArticleService;

    // Create Article
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public KnowledgeArticleResponse createArticle(
            @Valid @RequestBody KnowledgeArticleRequest request) {

        return knowledgeArticleService.createArticle(request);
    }

    // Update Article
    @PutMapping("/{id}")
    public KnowledgeArticleResponse updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody KnowledgeArticleRequest request) {

        return knowledgeArticleService.updateArticle(id, request);
    }

    // Delete Article
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArticle(@PathVariable Long id) {

        knowledgeArticleService.deleteArticle(id);
    }

    // Get Article by Id
    @GetMapping("/{id}")
    public KnowledgeArticleResponse getArticleById(
            @PathVariable Long id) {

        return knowledgeArticleService.getArticleById(id);
    }

    // Get All Articles
    @GetMapping
    public List<KnowledgeArticleResponse> getAllArticles() {

        return knowledgeArticleService.getAllArticles();
    }

    // Get Articles by Author
    @GetMapping("/author/{authorId}")
    public List<KnowledgeArticleResponse> getArticlesByAuthor(
            @PathVariable Long authorId) {

        return knowledgeArticleService.getArticlesByAuthor(authorId);
    }

    // Get Articles by Skill
    @GetMapping("/skill/{skillId}")
    public List<KnowledgeArticleResponse> getArticlesBySkill(
            @PathVariable Long skillId) {

        return knowledgeArticleService.getArticlesBySkill(skillId);
    }

    // Search by Title
    @GetMapping("/search")
    public List<KnowledgeArticleResponse> searchByTitle(
            @RequestParam String title) {

        return knowledgeArticleService.searchByTitle(title);
    }
}