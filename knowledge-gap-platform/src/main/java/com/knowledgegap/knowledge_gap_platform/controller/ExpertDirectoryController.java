package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import com.knowledgegap.knowledge_gap_platform.service.ExpertDirectoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expert-directory")
@RequiredArgsConstructor
public class ExpertDirectoryController {

    private final ExpertDirectoryService expertDirectoryService;

    // Add Expert
    @PostMapping
    public ResponseEntity<ExpertDirectoryResponse> addExpert(
            @Valid @RequestBody ExpertDirectoryRequest request) {

        return new ResponseEntity<>(
                expertDirectoryService.addExpert(request),
                HttpStatus.CREATED
        );
    }

    // Update Expert
    @PutMapping("/{id}")
    public ResponseEntity<ExpertDirectoryResponse> updateExpert(
            @PathVariable Long id,
            @Valid @RequestBody ExpertDirectoryRequest request) {

        return ResponseEntity.ok(
                expertDirectoryService.updateExpert(id, request)
        );
    }

    // Delete Expert
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpert(
            @PathVariable Long id) {

        expertDirectoryService.deleteExpert(id);

        return ResponseEntity.ok("Expert deleted successfully");
    }

    // Get Expert By Id
    @GetMapping("/{id}")
    public ResponseEntity<ExpertDirectoryResponse> getExpertById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertById(id)
        );
    }

    // Get Experts By Skill
    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<ExpertDirectoryResponse>> getExpertsBySkill(
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertsBySkill(skillId)
        );
    }

    // Get Experts By User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpertDirectoryResponse>> getExpertsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertsByUser(userId)
        );
    }

    // Get Top 5 Experts
    @GetMapping("/top5")
    public ResponseEntity<List<ExpertDirectoryResponse>> getTop5Experts() {

        return ResponseEntity.ok(
                expertDirectoryService.getTop5Experts()
        );
    }

    // Get Experts By Skill And Level
    @GetMapping("/skill/{skillId}/level/{level}")
    public ResponseEntity<List<ExpertDirectoryResponse>> getExpertsBySkillAndLevel(
            @PathVariable Long skillId,
            @PathVariable ProficiencyLevel level) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertsBySkillAndLevel(skillId, level)
        );
    }
}