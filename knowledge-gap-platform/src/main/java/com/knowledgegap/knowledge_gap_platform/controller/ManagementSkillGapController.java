package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/management/skill-gaps")
@PreAuthorize("hasAnyRole('HR_SPECIALIST','SYS_ADMIN')")
public class ManagementSkillGapController {
    private final SkillGapService skillGapService;

    @PostMapping("/analyze/{user_id}")
    public ResponseEntity<List<SkillGapResponse>> employeeSkillGap(@PathVariable Long user_id){
        SkillGapRequest request=new SkillGapRequest(user_id);
        return ResponseEntity.ok(skillGapService.analyzeSkillGap(request));
    }

}
