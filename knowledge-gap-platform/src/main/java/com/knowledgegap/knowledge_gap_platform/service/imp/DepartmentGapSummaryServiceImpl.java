package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentGapSummaryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.*;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.DepartmentGapSummaryRepository;
import com.knowledgegap.knowledge_gap_platform.repository.DepartmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillGapRepository;
import com.knowledgegap.knowledge_gap_platform.service.DepartmentGapSummaryService;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class DepartmentGapSummaryServiceImpl implements DepartmentGapSummaryService {
    private  final SkillGapRepository skillGapRepository;
    private final SkillGapService skillGapService;
    private final DepartmentRepository departmentRepository;
    private final DepartmentGapSummaryRepository departmentGapSummaryRepository;

    @Override
    public List<DepartmentGapSummaryResponse> analyzeCurrentMonthSummaryUsingDeptId(Long deptId) {
        Department department=departmentRepository.findById(deptId)
                .orElseThrow(()->new ResourceNotFoundException("Department not found "));

        LocalDate today = LocalDate.now();
        LocalDate periodStart = today.withDayOfMonth(1);
        LocalDate periodEnd = today.withDayOfMonth(today.lengthOfMonth());

        if (periodStart.isAfter(periodEnd)) {
            throw new IllegalArgumentException("Period start cannot be after period end");
        }

        //updating skill gaps
        skillGapService.updateAllByUserDepartmentId(deptId);

        //deleting old summary
        departmentGapSummaryRepository.deleteByDepartmentIdAndPeriodStartAndPeriodEnd(deptId,periodStart,periodEnd);



        // then find
        List<SkillGap> totalGaps=skillGapRepository.
                findAllByUserDepartmentIdAndDetectedAtBetween
                        (deptId,periodStart.atStartOfDay(),periodEnd.atTime(LocalTime.MAX
        ));

        if(totalGaps.isEmpty()){
            throw new IllegalStateException("No skill gap data available for the selected period. Generate Skill Gaps first.");
        }

        Map<Skill,List<SkillGap>>groupedBySkill=totalGaps.
                stream().collect(Collectors.groupingBy(SkillGap::getSkill));

        List<DepartmentGapSummary> summaries=new ArrayList<>();

        for (Map.Entry<Skill, List<SkillGap>> entry : groupedBySkill.entrySet()) {

            Skill skill = entry.getKey();
            List<SkillGap> gaps = entry.getValue();
            int count= gaps.size();
            BigDecimal total = gaps.stream()
                    .map(SkillGap::getGapScore)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal average = total.divide(
                    BigDecimal.valueOf(gaps.size()),
                    2,
                    RoundingMode.HALF_UP
            );

            DepartmentGapSummary departmentGapSummary=DepartmentGapSummary.builder()
                            .department(department)
                    .avgGapScore(average)
                    .employeesWithGap(count)
                    .skill(skill)
                    .periodEnd(periodEnd)
                    .periodStart(periodStart).
                    build();
            summaries.add(departmentGapSummary);
        }

        return departmentGapSummaryRepository.saveAll(summaries).stream().map(this::mapToDepartmentGapSummaryResponse).toList();
    }

    @Override
    public List<DepartmentGapSummaryResponse> getHistoricalDepartmentGapSummary(Long deptId, LocalDate periodStart) {
        LocalDate periodEnd=periodStart.withDayOfMonth(periodStart.lengthOfMonth());
        List<DepartmentGapSummary> summaries=departmentGapSummaryRepository.findAllByDepartmentIdAndPeriodStartAndPeriodEnd(deptId,periodStart,periodEnd);

        if(summaries.isEmpty()){
            throw new ResourceNotFoundException("No department gap summary found for the selected month.");
        }

        return summaries.stream().map(this::mapToDepartmentGapSummaryResponse).toList();
    }

    private DepartmentGapSummaryResponse mapToDepartmentGapSummaryResponse(DepartmentGapSummary departmentGapSummary){
        return DepartmentGapSummaryResponse.builder()
                .id(departmentGapSummary.getId())
                .departmentName(departmentGapSummary.getDepartment().getName())
                .skillId(departmentGapSummary.getSkill().getId())
                .skillName(departmentGapSummary.getSkill().getName())
                .departmentId(departmentGapSummary.getDepartment().getId())
                .avgGapScore(departmentGapSummary.getAvgGapScore())
                .employeesWithGap(departmentGapSummary.getEmployeesWithGap())
                .periodEnd(departmentGapSummary.getPeriodEnd())
                .periodStart(departmentGapSummary.getPeriodStart())
                .build();
    }
}
