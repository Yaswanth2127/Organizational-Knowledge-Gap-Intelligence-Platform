package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.KnowledgeGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeGap;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeGapRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.KnowledgeGapService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KnowledgeGapServiceImpl implements KnowledgeGapService {

    private final KnowledgeGapRepository knowledgeGapRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final AssessmentRepository assessmentRepository;

    @Override
    public List<KnowledgeGapResponse> getAllKnowledgeGaps() {

        return knowledgeGapRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public KnowledgeGapResponse getKnowledgeGapById(Long id) {

        KnowledgeGap gap = knowledgeGapRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Knowledge Gap not found"));

        return mapToResponse(gap);
    }

    @Override
    public List<KnowledgeGapResponse> getKnowledgeGapsByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return knowledgeGapRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<KnowledgeGapResponse> getKnowledgeGapsBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        return knowledgeGapRepository.findBySkill(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void recalculateGap(Long userId, Long skillId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        Assessment assessment = assessmentRepository
                .findTopByUserAndSkillOrderByAssessedAtDesc(user, skill)
                .orElseThrow(() ->
                        new EntityNotFoundException("Assessment not found"));

        KnowledgeGap knowledgeGap = knowledgeGapRepository
                .findByUserAndSkill(user, skill)
                .orElse(new KnowledgeGap());

        knowledgeGap.setUser(user);
        knowledgeGap.setSkill(skill);

        int requiredLevel = 5;

        int currentLevel;

        if (assessment.getScore().doubleValue() >= 90) {
            currentLevel = 5;
        } else if (assessment.getScore().doubleValue() >= 75) {
            currentLevel = 4;
        } else if (assessment.getScore().doubleValue() >= 60) {
            currentLevel = 3;
        } else if (assessment.getScore().doubleValue() >= 40) {
            currentLevel = 2;
        } else {
            currentLevel = 1;
        }

        int gap = requiredLevel - currentLevel;

        knowledgeGap.setRequiredLevel(requiredLevel);
        knowledgeGap.setCurrentLevel(currentLevel);
        knowledgeGap.setGap(gap);

        if (gap == 0) {
            knowledgeGap.setGapStatus("COMPLETED");
        } else if (gap == 1) {
            knowledgeGap.setGapStatus("LOW");
        } else if (gap == 2) {
            knowledgeGap.setGapStatus("MEDIUM");
        } else {
            knowledgeGap.setGapStatus("HIGH");
        }

        knowledgeGapRepository.save(knowledgeGap);
    }

    @Override
    public void deleteKnowledgeGap(Long id) {

        KnowledgeGap gap = knowledgeGapRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Knowledge Gap not found"));

        knowledgeGapRepository.delete(gap);
    }

    private KnowledgeGapResponse mapToResponse(KnowledgeGap gap) {

        return KnowledgeGapResponse.builder()
                .id(gap.getId())

                .userId(gap.getUser().getId())
                .userName(gap.getUser().getFullName())

                .skillId(gap.getSkill().getId())
                .skillName(gap.getSkill().getName())

                .requiredLevel(gap.getRequiredLevel())
                .currentLevel(gap.getCurrentLevel())
                .gap(gap.getGap())
                .gapStatus(gap.getGapStatus())
                .lastUpdated(gap.getLastUpdated())

                .build();
    }

}