package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeGapResponse;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge-gaps")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KnowledgeGapController {

    private final KnowledgeGapService knowledgeGapService;

    @GetMapping
    public List<KnowledgeGapResponse> getAllKnowledgeGaps() {

        return knowledgeGapService.getAllKnowledgeGaps();
    }

    @GetMapping("/{id}")
    public KnowledgeGapResponse getKnowledgeGapById(
            @PathVariable Long id) {

        return knowledgeGapService.getKnowledgeGapById(id);
    }

    @GetMapping("/user/{userId}")
    public List<KnowledgeGapResponse> getKnowledgeGapsByUser(
            @PathVariable Long userId) {

        return knowledgeGapService.getKnowledgeGapsByUser(userId);
    }

    @GetMapping("/skill/{skillId}")
    public List<KnowledgeGapResponse> getKnowledgeGapsBySkill(
            @PathVariable Long skillId) {

        return knowledgeGapService.getKnowledgeGapsBySkill(skillId);
    }

    @PostMapping("/recalculate/{userId}/{skillId}")
    @ResponseStatus(HttpStatus.OK)
    public String recalculateGap(
            @PathVariable Long userId,
            @PathVariable Long skillId) {

        knowledgeGapService.recalculateGap(userId, skillId);

        return "Knowledge Gap recalculated successfully.";
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteKnowledgeGap(
            @PathVariable Long id) {

        knowledgeGapService.deleteKnowledgeGap(id);
    }
}