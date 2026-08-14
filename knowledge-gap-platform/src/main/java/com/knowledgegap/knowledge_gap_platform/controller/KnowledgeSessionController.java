package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionRequest;
import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeSessionResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge-sessions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KnowledgeSessionController {

    private final KnowledgeSessionService knowledgeSessionService;
    // Create Knowledge Session
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public KnowledgeSessionResponse createSession(
            @Valid @RequestBody KnowledgeSessionRequest request) {

        return knowledgeSessionService.createSession(request);
    }


    // Update Knowledge Session
    @PutMapping("/{id}")
    public KnowledgeSessionResponse updateSession(
            @PathVariable Long id,
            @Valid @RequestBody KnowledgeSessionRequest request) {

        return knowledgeSessionService.updateSession(id, request);
    }


    // Delete Knowledge Session
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSession(
            @PathVariable Long id) {

        knowledgeSessionService.deleteSession(id);
    }


    // Get All Knowledge Sessions
    @GetMapping
    public List<KnowledgeSessionResponse> getAllSessions() {

        return knowledgeSessionService.getAllSessions();
    }


    // Get Session by ID
    @GetMapping("/{id}")
    public KnowledgeSessionResponse getSessionById(
            @PathVariable Long id) {

        return knowledgeSessionService.getSessionById(id);
    }


    // Get Sessions by Host
    @GetMapping("/host/{hostId}")
    public List<KnowledgeSessionResponse> getSessionsByHost(
            @PathVariable Long hostId) {

        return knowledgeSessionService.getSessionsByHost(hostId);
    }


    // Get Sessions by Skill
    @GetMapping("/skill/{skillId}")
    public List<KnowledgeSessionResponse> getSessionsBySkill(
            @PathVariable Long skillId) {

        return knowledgeSessionService.getSessionsBySkill(skillId);
    }


    // Get Sessions by Status
    @GetMapping("/status/{status}")
    public List<KnowledgeSessionResponse> getSessionsByStatus(
            @PathVariable SessionStatus status) {

        return knowledgeSessionService.getSessionsByStatus(status);
    }
}