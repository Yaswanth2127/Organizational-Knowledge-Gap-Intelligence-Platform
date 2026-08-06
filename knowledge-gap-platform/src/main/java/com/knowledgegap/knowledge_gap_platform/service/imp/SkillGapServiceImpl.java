package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AnalysisTrigger;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.*;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class SkillGapServiceImpl implements SkillGapService {
    private final UserRepository userRepository;
    private final CompetencyFrameworkRepository competencyFrameworkRepository;
    private final FrameworkRequiredSkillRepository requiredSkillRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final SkillGapRepository skillGapRepository;
    private final RecommendationRepository recommendationRepository;


    @Override
    public List<SkillGapResponse> getSkillGapsByUserId(Long userId) {
         return mapToSkillGapResponse(skillGapRepository.findByUserIdAndStatus(userId,GapStatus.OPEN));
    }

    @Override
    public List<SkillGapResponse> analyzeSkillGap(SkillGapRequest skillGapRequest, AnalysisTrigger analysisTrigger) {
        User user=userRepository.findById(skillGapRequest.getUserId()).orElseThrow(()->
                new ResourceNotFoundException("User not found "));

        if(user.getJobRole()==null){
            throw new ResourceNotFoundException("user has no job role ");
        }
        JobRole jobRole=user.getJobRole();
        CompetencyFramework framework=competencyFrameworkRepository.findByJobRole(jobRole).orElseThrow(()->
                new ResourceNotFoundException("Framework not found "));

        // we have to find skill gaps based on user id
       List<SkillGap> skillGaps=skillGapRepository.findByUserId(user.getId());
        Map<Long, SkillGap> skillGapMap =
                skillGaps.stream()
                        .collect(Collectors.toMap(
                                sg -> sg.getSkill().getId(),
                                Function.identity()
                        ));


        List<FrameworkRequiredSkill> requiredSkills=requiredSkillRepository.findByFramework(framework);
        if(requiredSkills.isEmpty()){
            throw new ResourceNotFoundException("No skills needed for this framework ");
        }

        List<EmployeeSkill> employeeSkills=employeeSkillRepository.findByUserId(user.getId());

        Map<Long, EmployeeSkill> employeeSkillMap =
                employeeSkills.stream()
                        .collect(Collectors.toMap(
                                es -> es.getSkill().getId(),
                                Function.identity()
                        ));


        LocalDateTime analyzedAt = LocalDateTime.now();
        List<SkillGap> gaps=new ArrayList<>();
        for(FrameworkRequiredSkill requiredSkill:requiredSkills){
            EmployeeSkill employeeSkill=employeeSkillMap.get(requiredSkill.getSkill().getId());
            SkillGap skillGap= skillGapMap.get(requiredSkill.getSkill().getId());

            if(skillGap==null){
                skillGap = SkillGap.builder()
                        .user(user)
                        .skill(requiredSkill.getSkill())
                        .build();
            }
            ProficiencyLevel currentLevel = employeeSkill == null
                    ? ProficiencyLevel.UNAWARE
                    : employeeSkill.getSelfRating();

            ProficiencyLevel requiredLevel=requiredSkill.getRequiredProficiency();

            int gap=Math.max(0,requiredLevel.getValue()-currentLevel.getValue());

            BigDecimal gapScore=BigDecimal.valueOf(gap);
            skillGap.setCurrentLevel(currentLevel);
            skillGap.setRequiredLevel(requiredLevel);
            skillGap.setGapScore(gapScore);
            skillGap.setSeverity(getGapSeverity(gap));
            skillGap.setLastAnalyzedAt(analyzedAt);
            skillGap.setAnalysisTrigger(analysisTrigger);
            skillGap.setFramework(framework);

            if (gap > 0) {
                skillGap.setStatus(GapStatus.OPEN);
                skillGap.setResolvedAt(null);
            } else {
                skillGap.setStatus(GapStatus.RESOLVED);
                skillGap.setResolvedAt(analyzedAt);
            }
            gaps.add(skillGap);
        }
        return  mapToSkillGapResponse(skillGapRepository.saveAll(gaps));
    }

    @Override
    public List<SkillGapResponse> FindAllByUserDepartmentId(Long deptId) {

        return List.of();
    }

    @Override
    public void updateAllByUserDepartmentId(Long deptId) {

        List<User> users=userRepository.findAllByDepartmentId(deptId);

        if(users.isEmpty()){
            throw new ResourceNotFoundException("No users are there in department");
        }

        for(User user:users) {
            analyzeSkillGap(new SkillGapRequest(user.getId()),AnalysisTrigger.MANUAL);
        }
    }


    private List<SkillGapResponse>mapToSkillGapResponse(List<SkillGap> skillGaps){
        List<SkillGapResponse> responses=new ArrayList<>();

        for(SkillGap skillGap:skillGaps){
            SkillGapResponse skillGapResponse= SkillGapResponse.builder()
                    .userId(skillGap.getUser().getId())
                    .employeeName(skillGap.getUser().getFullName())
                    .skillGapId(skillGap.getId())
                    .skillId(skillGap.getSkill().getId())
                    .skillName(skillGap.getSkill().getName())
                    .severity(skillGap.getSeverity())
                    .status(skillGap.getStatus())
                    .detectedAt(skillGap.getDetectedAt())
                    .currentLevel(skillGap.getCurrentLevel())
                    .requiredLevel(skillGap.getRequiredLevel())
                    .gapScore(skillGap.getGapScore())
                    .lastAnalyzedAt(skillGap.getLastAnalyzedAt())
                    .analysisTrigger(skillGap.getAnalysisTrigger())
                    .build();
            responses.add(skillGapResponse);
        }
        return responses;
    }
    private GapSeverity getGapSeverity(int gap) {
        return switch (gap) {
            case 0->GapSeverity.NONE;
            case 1 -> GapSeverity.LOW;
            case 2 -> GapSeverity.MEDIUM;
            case 3 -> GapSeverity.HIGH;
            default -> GapSeverity.CRITICAL;
        };
    }
}
