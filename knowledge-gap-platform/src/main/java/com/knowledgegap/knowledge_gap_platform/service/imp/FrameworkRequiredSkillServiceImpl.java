package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.FrameworkRequiredSkillResponse;
import com.knowledgegap.knowledge_gap_platform.entity.CompetencyFramework;
import com.knowledgegap.knowledge_gap_platform.entity.FrameworkRequiredSkill;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.repository.CompetencyFrameworkRepository;
import com.knowledgegap.knowledge_gap_platform.repository.FrameworkRequiredSkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.service.FrameworkRequiredSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FrameworkRequiredSkillServiceImpl implements FrameworkRequiredSkillService {

    private final FrameworkRequiredSkillRepository frameworkRequiredSkillRepository;
    private final CompetencyFrameworkRepository competencyFrameworkRepository;
    private final SkillRepository skillRepository;

    @Override
    public FrameworkRequiredSkillResponse addFrameworkRequiredSkill(FrameworkRequiredSkillRequest request) {

        CompetencyFramework framework = competencyFrameworkRepository.findById(request.getFrameworkId())
                .orElseThrow(() -> new RuntimeException("Competency Framework not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (frameworkRequiredSkillRepository.existsByFrameworkIdAndSkillId(
                framework.getId(),
                skill.getId())) {

            throw new RuntimeException("Skill already exists in this framework");
        }

        FrameworkRequiredSkill entity = FrameworkRequiredSkill.builder()
                .framework(framework)
                .skill(skill)
                .requiredProficiency(request.getRequiredProficiency())
                .weight(request.getWeight())
                .build();

        entity = frameworkRequiredSkillRepository.save(entity);

        return new FrameworkRequiredSkillResponse(
                entity.getId(),
                entity.getFramework().getId(),
                entity.getSkill().getId(),
                entity.getRequiredProficiency(),
                entity.getWeight()
        );
    }

    @Override
    public List<FrameworkRequiredSkillResponse> getAll() {

        return frameworkRequiredSkillRepository.findAll()
                .stream()
                .map(entity -> new FrameworkRequiredSkillResponse(
                        entity.getId(),
                        entity.getFramework().getId(),
                        entity.getSkill().getId(),
                        entity.getRequiredProficiency(),
                        entity.getWeight()
                ))
                .toList();
    }

    @Override
    public FrameworkRequiredSkillResponse getById(Long id) {

        FrameworkRequiredSkill entity = frameworkRequiredSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Framework Required Skill not found"));

        return new FrameworkRequiredSkillResponse(
                entity.getId(),
                entity.getFramework().getId(),
                entity.getSkill().getId(),
                entity.getRequiredProficiency(),
                entity.getWeight()
        );
    }

    @Override
    public FrameworkRequiredSkillResponse update(Long id,
                                                 FrameworkRequiredSkillRequest request) {

        FrameworkRequiredSkill entity = frameworkRequiredSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Framework Required Skill not found"));

        CompetencyFramework framework = competencyFrameworkRepository.findById(request.getFrameworkId())
                .orElseThrow(() -> new RuntimeException("Competency Framework not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (frameworkRequiredSkillRepository.existsByFrameworkIdAndSkillIdAndIdNot(
                framework.getId(),
                skill.getId(),
                id)) {

            throw new RuntimeException("Skill already exists in this framework");
        }

        entity.setFramework(framework);
        entity.setSkill(skill);
        entity.setRequiredProficiency(request.getRequiredProficiency());
        entity.setWeight(request.getWeight());

        entity = frameworkRequiredSkillRepository.save(entity);

        return new FrameworkRequiredSkillResponse(
                entity.getId(),
                entity.getFramework().getId(),
                entity.getSkill().getId(),
                entity.getRequiredProficiency(),
                entity.getWeight()
        );
    }

    @Override
    public void delete(Long id) {

        if (!frameworkRequiredSkillRepository.existsById(id)) {
            throw new RuntimeException("Framework Required Skill not found");
        }

        frameworkRequiredSkillRepository.deleteById(id);
    }
}