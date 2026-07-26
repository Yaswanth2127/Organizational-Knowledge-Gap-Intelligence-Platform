package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AnalysisTrigger;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/management/skill-gaps")
@PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
public class ManagementSkillGapController {
    private final SkillGapService skillGapService;
    private final UserRepository userRepository;

    @PostMapping("/analyze/{user_id}")
    public ResponseEntity<List<SkillGapResponse>> employeeSkillGap(@PathVariable Long user_id){
        SkillGapRequest request=new SkillGapRequest(user_id);
        return ResponseEntity.ok(skillGapService.analyzeSkillGap(request, AnalysisTrigger.MANUAL));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SkillGapResponse>> getEmployeeSkillGaps(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                skillGapService.getSkillGapsByUserId(userId)
        );
    }
}
