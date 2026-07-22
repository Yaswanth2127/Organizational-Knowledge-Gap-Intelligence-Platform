package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeGap;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeGapRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.GapCalculationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GapCalculationServiceImpl implements GapCalculationService {

    private final KnowledgeGapRepository knowledgeGapRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public void recalculateGap(Long userId, Long skillId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        KnowledgeGap gap = knowledgeGapRepository
                .findByUserAndSkill(user, skill)
                .orElse(new KnowledgeGap());

        gap.setUser(user);
        gap.setSkill(skill);

        /*
            Dummy logic

            Required Level = 5

            Current Level =
            assessment score / 20

            Gap = Required - Current
        */

        int requiredLevel = 5;

        int currentLevel = 3;

        gap.setRequiredLevel(requiredLevel);
        gap.setCurrentLevel(currentLevel);

        gap.setGap(requiredLevel - currentLevel);

        knowledgeGapRepository.save(gap);
    }

}