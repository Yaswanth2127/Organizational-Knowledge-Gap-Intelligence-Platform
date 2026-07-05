package com.knowledgegap.knowledge_gap_platform.service;


import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryResponse;

import java.util.List;

public interface SkillCategoryService {
    SkillCategoryResponse addSkillCategory(SkillCategoryRequest skillCategoryRequest);
    List<SkillCategoryResponse> getAllSkillCategories();
    SkillCategoryResponse getSkillCategoryById(Long id);
    SkillCategoryResponse updateSkillCategory(Long id,SkillCategoryRequest skillCategoryRequest);
    void deleteSkillCategoryById(Long id);
}
