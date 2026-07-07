package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillResponse;
import com.knowledgegap.knowledge_gap_platform.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
@RestController
@RequestMapping("/api/skills")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SkillController {
    private  final SkillService skillService;

    @PostMapping("/add")
    public ResponseEntity<SkillResponse> addSkill(@RequestBody SkillRequest skillRequest){
        return ResponseEntity.ok(skillService.addSkill(skillRequest));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SkillResponse>> getAllSkills(){
        return ResponseEntity.ok(skillService.getAllSkills());

    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(skillService.getSkillById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> update(@PathVariable Long id,
                                                        @RequestBody SkillRequest skillRequest){
        return ResponseEntity.ok(skillService.updateSkill(id,skillRequest));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        skillService.deleteSkillById(id);
        return ResponseEntity.noContent().build();
    }

}
