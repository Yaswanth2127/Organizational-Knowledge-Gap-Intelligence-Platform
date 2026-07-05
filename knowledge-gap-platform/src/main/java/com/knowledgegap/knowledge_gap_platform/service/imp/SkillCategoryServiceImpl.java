package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillCategoryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.SkillCategory;
import com.knowledgegap.knowledge_gap_platform.repository.SkillCategoryRepository;
import com.knowledgegap.knowledge_gap_platform.service.SkillCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillCategoryServiceImpl implements SkillCategoryService {
    private final SkillCategoryRepository skillCategoryRepository;
    @Override
    public SkillCategoryResponse addSkillCategory(SkillCategoryRequest skillCategoryRequest) {
        if(skillCategoryRepository.existsByName(skillCategoryRequest.getName())){
            throw  new RuntimeException("Skill Already Exists ");
        }
        SkillCategory skillCategory=SkillCategory
                .builder().
                name(skillCategoryRequest.getName()).build();

        skillCategory=skillCategoryRepository.save(skillCategory);
        return new SkillCategoryResponse(skillCategory.getId(),skillCategory.getName());
    }

    @Override
    public List<SkillCategoryResponse> getAllSkillCategories() {
        return  skillCategoryRepository.findAll()
                .stream()
                .map(skill->new SkillCategoryResponse(skill.getId(),skill.getName())).toList();
    }

    @Override
    public SkillCategoryResponse getSkillCategoryById(Long id) {
        SkillCategory skillCategory=skillCategoryRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Skill category is not found "));

        return new SkillCategoryResponse(skillCategory.getId(),skillCategory.getName());
    }

    @Override
    public SkillCategoryResponse updateSkillCategory(Long id, SkillCategoryRequest skillCategoryRequest) {
        SkillCategory skillCategory=skillCategoryRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Skill category is not found"));

        if(!skillCategory.getName().equals(skillCategoryRequest.getName()) &&
                skillCategoryRepository.existsByName(skillCategoryRequest.getName())){
            throw new RuntimeException("Skill category name already exists ");
        }
        skillCategory.setName(skillCategoryRequest.getName());
        skillCategory=skillCategoryRepository.save(skillCategory);

        return new SkillCategoryResponse(skillCategory.getId(),skillCategory.getName());
    }

    @Override
    public void deleteSkillCategoryById(Long id) {
        if(!skillCategoryRepository.existsById(id)){
           throw new RuntimeException("Skill category is not found ");
        }
        skillCategoryRepository.deleteById(id);

    }
}
