package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillResponse;
import com.knowledgegap.knowledge_gap_platform.service.FrameworkRequiredSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
@RestController
@RequestMapping("/api/framework-required-skills")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FrameworkRequiredSkillController {

    private final FrameworkRequiredSkillService frameworkRequiredSkillService;

    @PostMapping("/add")
    public ResponseEntity<FrameworkRequiredSkillResponse> addFrameworkRequiredSkill(
            @RequestBody FrameworkRequiredSkillRequest request) {

        return ResponseEntity.ok(
                frameworkRequiredSkillService.addFrameworkRequiredSkill(request));
    }

    @GetMapping("/all")
    public ResponseEntity<List<FrameworkRequiredSkillResponse>> getAll() {

        return ResponseEntity.ok(
                frameworkRequiredSkillService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FrameworkRequiredSkillResponse> getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                frameworkRequiredSkillService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FrameworkRequiredSkillResponse> update(
            @PathVariable Long id,
            @RequestBody FrameworkRequiredSkillRequest request) {

        return ResponseEntity.ok(
                frameworkRequiredSkillService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        frameworkRequiredSkillService.delete(id);
        return ResponseEntity.noContent().build();
    }
}