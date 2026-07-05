package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillResponse;

import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.SkillCategory;
import com.knowledgegap.knowledge_gap_platform.repository.SkillCategoryRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;
    private final SkillCategoryRepository skillCategoryRepository;
    @Override
    public SkillResponse addSkill(SkillRequest skillRequest) {

        Skill skill = Skill.builder()
                .name(skillRequest.getName())
                .description(skillRequest.getDescription())
                .build();

        if (skillRequest.getSkillCategoryId() != null) {

            SkillCategory skillCategory = skillCategoryRepository
                    .findById(skillRequest.getSkillCategoryId())
                    .orElseThrow(() -> new RuntimeException("Skill Category not found"));

            if (skillRepository.existsByNameAndSkillCategoryId(
                    skillRequest.getName(),
                    skillCategory.getId())) {

                throw new RuntimeException("Skill already exists in this category");
            }

            skill.setSkillCategory(skillCategory);

        } else {

            if (skillRepository.existsByName(skillRequest.getName())) {
                throw new RuntimeException("Skill already exists");
            }

            skill.setSkillCategory(null);
        }

        skill = skillRepository.save(skill);

        Long skillCategoryId = skill.getSkillCategory() != null
                ? skill.getSkillCategory().getId()
                : null;

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skillCategoryId,
                skill.getDescription()
        );
    }

    @Override
    public List<SkillResponse> getAllSkills() {
       return skillRepository.findAll()
                .stream().map(skill->new SkillResponse(
                        skill.getId(),skill.getName(),skill.getSkillCategory()!=null?
                skill.getSkillCategory().getId():null,skill.getDescription()
                )).toList();

    }

    @Override
    public SkillResponse getSkillById(Long id) {
        Skill skill=skillRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Skill not found"));

        Long skillCategoryId=skill.getSkillCategory()!=null?
                skill.getSkillCategory().getId():null;
        return new SkillResponse(skill.getId(),skill.getName(),skillCategoryId,skill.getDescription());
    }

    @Override
    public SkillResponse updateSkill(Long id, SkillRequest skillRequest) {
        Skill skill=skillRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Skill not found "));

        if(skillRequest.getSkillCategoryId()!=null){
            SkillCategory skillCategory=skillCategoryRepository.findById(skillRequest.getSkillCategoryId())
                    .orElseThrow(()->new RuntimeException("Skill category does not exist"));
            if(skillRepository.existsByNameAndSkillCategoryIdAndIdNot(skillRequest.getName(),
                    skillRequest.getSkillCategoryId(),skill.getId())){
                throw new RuntimeException("Already exists skill with that skill category");
            }else{
                if (!skill.getName().equals(skillRequest.getName())
                        && skillRepository.existsByName(skillRequest.getName())) {

                    throw new RuntimeException("Skill already exists");
                }
                skill.setName(skillRequest.getName());
                skill.setDescription(skillRequest.getDescription());
                skill.setSkillCategory(skillCategory);
            }
        }else{
            skill.setName(skillRequest.getName());
            skill.setDescription(skillRequest.getDescription());
            skill.setSkillCategory(null);
        }
        skill=skillRepository.save(skill);
        Long skillCategoryId=skill.getSkillCategory()!=null?
                skill.getSkillCategory().getId():null;
        return new SkillResponse(skill.getId(),skill.getName(),skillCategoryId,skill.getDescription());
    }

    @Override
    public void deleteSkillById(Long id) {

        if(!skillRepository.existsById(id)){
            throw new RuntimeException("SKill not found ");
        }
        skillRepository.deleteById(id);

    }
}
