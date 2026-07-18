package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapResponse;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.*;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillGapServiceImpl implements SkillGapService {
    private final UserRepository userRepository;
    private final CompetencyFrameworkRepository competencyFrameworkRepository;
    private final FrameworkRequiredSkillRepository requiredSkillRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final SkillGapRepository skillGapRepository;


    @Override
    public List<SkillGapResponse> analyzeSkillGap(SkillGapRequest skillGapRequest) {
        User user=userRepository.findById(skillGapRequest.getUserId()).orElseThrow(()->
                new RuntimeException("User not found "));

        if(user.getJobRole()==null){
            throw new RuntimeException("user has no job role ");
        }

        // to deleting previous records and updating the new records
        skillGapRepository.deleteByUserId(user.getId());

        JobRole jobRole=user.getJobRole();

        CompetencyFramework framework=competencyFrameworkRepository.findByJobRole(jobRole).orElseThrow(()->
                new RuntimeException("Framework not found "));

        List<FrameworkRequiredSkill> requiredSkills=requiredSkillRepository.findByFramework(framework);

        List<EmployeeSkill> employeeSkills=employeeSkillRepository.findByUserId(user.getId());

        Map<Long, EmployeeSkill> employeeSkillMap =
                employeeSkills.stream()
                        .collect(Collectors.toMap(
                                es -> es.getSkill().getId(),
                                Function.identity()
                        ));

        if(requiredSkills.isEmpty()){
            throw new RuntimeException("No skills needed for this framework ");
        }
        List<SkillGap> gaps=new ArrayList<>();
        for(FrameworkRequiredSkill requiredSkill:requiredSkills){
            EmployeeSkill employeeSkill=employeeSkillMap.get(requiredSkill.getId());

            ProficiencyLevel currentLevel = employeeSkill == null
                            ? ProficiencyLevel.UNAWARE
                            : employeeSkill.getSelfRating();

            ProficiencyLevel requiredLevel=requiredSkill.getRequiredProficiency();

            int gap=Math.max(0,requiredLevel.getValue()-currentLevel.getValue());

            BigDecimal gapScore=BigDecimal.valueOf(gap);

            if(gap!=0){
                GapSeverity gapSeverity=getGapSeverity(gap);
                SkillGap skillGap= SkillGap.builder()
                                .skill(requiredSkill.getSkill())
                        .currentLevel(currentLevel)
                        .requiredLevel(requiredLevel)
                        .framework(framework)
                        .user(user)
                        .gapScore(gapScore)
                        .status(GapStatus.OPEN)
                        .severity(gapSeverity)
                        .build();

                gaps.add(skillGap);
            }
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
            analyzeSkillGap(new SkillGapRequest(user.getId()));
        }
    }


    private List<SkillGapResponse>mapToSkillGapResponse(List<SkillGap> skillGaps){
        List<SkillGapResponse> responses=new ArrayList<>();

        for(SkillGap skillGap:skillGaps){
            SkillGapResponse skillGapResponse= SkillGapResponse.builder()
                    .userId(skillGap.getUser().getId())
                    .employeeName(skillGap.getUser().getFullName())
                    .skillGapId(skillGap.getId())
                    .skillName(skillGap.getSkill().getName())
                    .severity(skillGap.getSeverity())
                    .status(skillGap.getStatus())
                    .detectedAt(skillGap.getDetectedAt())
                    .currentLevel(skillGap.getCurrentLevel())
                    .requiredLevel(skillGap.getRequiredLevel())
                    .gapScore(skillGap.getGapScore())
                    .build();
            responses.add(skillGapResponse);
        }
        return responses;
    }
    private GapSeverity getGapSeverity(int gap) {
        return switch (gap) {
            case 1 -> GapSeverity.LOW;
            case 2 -> GapSeverity.MEDIUM;
            case 3 -> GapSeverity.HIGH;
            default -> GapSeverity.CRITICAL;
        };
    }
}
