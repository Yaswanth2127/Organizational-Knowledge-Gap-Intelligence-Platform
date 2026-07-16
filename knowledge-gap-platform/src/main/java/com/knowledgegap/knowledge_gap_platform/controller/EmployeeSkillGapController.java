package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/skill-gaps/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeSkillGapController {
    private final SkillGapService skillGapService;
    private  final UserRepository userRepository;
    @PostMapping("/analyze")
    public ResponseEntity<List<SkillGapResponse>> analyzeSkillGaps(){
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SkillGapRequest gapRequest = SkillGapRequest.builder()
                .userId(user.getId())
                .build();
        return ResponseEntity.ok(skillGapService.analyzeSkillGap(gapRequest));
    }
}
