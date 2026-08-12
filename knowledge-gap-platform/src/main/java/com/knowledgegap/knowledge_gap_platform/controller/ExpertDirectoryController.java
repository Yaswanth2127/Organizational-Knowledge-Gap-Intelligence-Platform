package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import com.knowledgegap.knowledge_gap_platform.service.ExpertDirectoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expert-directory")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ExpertDirectoryController {
    private final ExpertDirectoryService expertDirectoryService;
    // Employee creates their own expert entry
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<ExpertDirectoryResponse> addExpert(
            @Valid @RequestBody ExpertDirectoryRequest request) {

        return new ResponseEntity<>(
                expertDirectoryService.addExpert(request),
                HttpStatus.CREATED
        );
    }

    // Employee updates their own entry
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<ExpertDirectoryResponse> updateExpert(
            @PathVariable Long id,
            @Valid @RequestBody ExpertDirectoryRequest request) {

        return ResponseEntity.ok(
                expertDirectoryService.updateExpert(id, request)
        );
    }

    // Employee deletes their own entry
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> deleteExpert(
            @PathVariable Long id) {

        expertDirectoryService.deleteExpert(id);

        return ResponseEntity.ok(
                "Expert deleted successfully"
        );
    }

    // View single expert
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public ResponseEntity<ExpertDirectoryResponse> getExpertById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertById(id)
        );
    }

    // Get all experts
    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public ResponseEntity<List<ExpertDirectoryResponse>> getAllExperts() {

        return ResponseEntity.ok(
                expertDirectoryService.getAllExperts()
        );
    }

    // Get experts by skill
    @GetMapping("/skill/{skillId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public ResponseEntity<List<ExpertDirectoryResponse>> getExpertsBySkill(
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertsBySkill(skillId)
        );
    }

    // Top experts
    @GetMapping("/top5")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public ResponseEntity<List<ExpertDirectoryResponse>> getTop5Experts() {

        return ResponseEntity.ok(
                expertDirectoryService.getTop5Experts()
        );
    }

    // Skill + expertise level
    @GetMapping("/skill/{skillId}/level/{level}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'HR_SPECIALIST', 'SYS_ADMIN')")
    public ResponseEntity<List<ExpertDirectoryResponse>>
    getExpertsBySkillAndLevel(
            @PathVariable Long skillId,
            @PathVariable ProficiencyLevel level) {

        return ResponseEntity.ok(
                expertDirectoryService.getExpertsBySkillAndLevel(
                        skillId,
                        level
                )
        );
    }
    @GetMapping("/me")
    public ResponseEntity<List<ExpertDirectoryResponse>> getMyExpertise() {
        return ResponseEntity.ok(
                expertDirectoryService.getMyExpertise()
        );
    }
}