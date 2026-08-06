package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeDashboardResponse;
import com.knowledgegap.knowledge_gap_platform.entity.EmployeeSkill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.CertificationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.EmployeeSkillRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.DashboardService;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class DashboardServiceImpl implements DashboardService {
    private  final EmployeeSkillRepository employeeSkillRepository;
    private final AssessmentRepository assessmentRepository;
    private final CertificationRepository certificationRepository;
    private  final AuthenticationService authenticationService;

    @Override
    public EmployeeDashboardResponse getEmployeeDashboard() {
        User user = authenticationService.getCurrentUser();

        // Total Skills
        int totalSkills =
                employeeSkillRepository.countByUserId(user.getId());

        // Completed Assessments
        int completedAssessments =
                assessmentRepository.countCompletedByUserId(user.getId());

        // Certifications
        int certifications =
                certificationRepository.countByUserId(user.getId());

        List<EmployeeSkill> skills =
                employeeSkillRepository.findByUserId(user.getId());

        double average = skills.stream()
                .filter(skill -> skill.getFinalRating() != null)
                .mapToInt(skill -> skill.getFinalRating().ordinal() + 1)
                .average()
                .orElse(0);
        // Competency
        int competencyScore = (int) ((average / 5.0) * 100);


        // Profile Completion
        int profileCompletion = 0;

        if (user.getFullName() != null) profileCompletion += 20;
        if (user.getEmail() != null) profileCompletion += 20;
        if (user.getPhoneNumber() != null) profileCompletion += 20;
        if (user.getDepartment() != null) profileCompletion += 20;
        if (user.getJobRole() != null) profileCompletion += 20;


        return EmployeeDashboardResponse.builder()
                .totalSkills(totalSkills)
                .completedAssessments(completedAssessments)
                .certifications(certifications)
                .competencyScore(competencyScore)
                .profileCompletion(profileCompletion)
                .build();
    }
}
