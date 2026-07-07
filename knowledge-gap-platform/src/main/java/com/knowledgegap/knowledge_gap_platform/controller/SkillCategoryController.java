package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryResponse;
import com.knowledgegap.knowledge_gap_platform.service.SkillCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasRole('SYS_ADMIN')")
@RestController
@RequestMapping("/api/skill-categories")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SkillCategoryController {
    private  final SkillCategoryService skillCategoryService;

    @PostMapping("/add")
    public ResponseEntity<SkillCategoryResponse> addSkillCategory(@RequestBody SkillCategoryRequest skillCategoryRequest){
        return ResponseEntity.ok(skillCategoryService.addSkillCategory(skillCategoryRequest));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SkillCategoryResponse>> getAllSkillCategories(){
        return ResponseEntity.ok(skillCategoryService.getAllSkillCategories());

    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillCategoryResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(skillCategoryService.getSkillCategoryById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillCategoryResponse> update(@PathVariable Long id,
                                                  @RequestBody SkillCategoryRequest skillCategoryRequest){
        return ResponseEntity.ok(skillCategoryService.updateSkillCategory(id,skillCategoryRequest));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        skillCategoryService.deleteSkillCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
