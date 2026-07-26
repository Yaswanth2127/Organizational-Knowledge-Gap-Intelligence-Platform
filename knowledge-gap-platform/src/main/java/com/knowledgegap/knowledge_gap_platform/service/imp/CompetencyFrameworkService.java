package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkResponse;
import com.knowledgegap.knowledge_gap_platform.dto.SkillGapRequest;
import com.knowledgegap.knowledge_gap_platform.entity.CompetencyFramework;
import com.knowledgegap.knowledge_gap_platform.entity.Department;
import com.knowledgegap.knowledge_gap_platform.entity.JobRole;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AnalysisTrigger;
import com.knowledgegap.knowledge_gap_platform.repository.CompetencyFrameworkRepository;
import com.knowledgegap.knowledge_gap_platform.repository.DepartmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.JobRoleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompetencyFrameworkService implements com.knowledgegap.knowledge_gap_platform.service.CompetencyFrameworkService {
    private final CompetencyFrameworkRepository competencyFrameworkRepository;
    private final JobRoleRepository jobRoleRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final SkillGapService skillGapService;

    @Override
    public CompetencyFrameworkResponse addCompetencyFramework(
            CompetencyFrameworkRequest request) {

        if (competencyFrameworkRepository.existsByJobRoleId(request.getJobRoleId())) {
            throw new RuntimeException("Competency Framework already exists for this Job Role");
        }

        JobRole jobRole = jobRoleRepository.findById(request.getJobRoleId())
                .orElseThrow(() -> new RuntimeException("Job Role not found"));

        User createdBy = userRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CompetencyFramework framework = CompetencyFramework.builder()
                .jobRole(jobRole)
                .createdBy(createdBy)
                .version(1)
                .isActive(true)
                .build();

        if (request.getDepartmentId() != null) {

            Department department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));

            framework.setDepartment(department);

        } else {
            framework.setDepartment(null);
        }

        framework = competencyFrameworkRepository.save(framework);

        Long departmentId = framework.getDepartment() != null
                ? framework.getDepartment().getId()
                : null;

        return new CompetencyFrameworkResponse(
                framework.getId(),
                framework.getJobRole().getId(),
                departmentId,
                framework.getVersion(),
                framework.getIsActive(),
                framework.getCreatedBy().getId()
        );
    }

    @Override
    public List<CompetencyFrameworkResponse> getAllCompetencyFrameworks() {

        return competencyFrameworkRepository.findAll()
                .stream()
                .map(framework -> new CompetencyFrameworkResponse(
                        framework.getId(),
                        framework.getJobRole().getId(),
                        framework.getDepartment() != null
                                ? framework.getDepartment().getId()
                                : null,
                        framework.getVersion(),
                        framework.getIsActive(),
                        framework.getCreatedBy().getId()
                ))
                .toList();
    }

    @Override
    public CompetencyFrameworkResponse getCompetencyFrameworkById(Long id) {

        CompetencyFramework framework = competencyFrameworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competency Framework not found"));

        Long departmentId = framework.getDepartment() != null
                ? framework.getDepartment().getId()
                : null;

        return new CompetencyFrameworkResponse(
                framework.getId(),
                framework.getJobRole().getId(),
                departmentId,
                framework.getVersion(),
                framework.getIsActive(),
                framework.getCreatedBy().getId()
        );
    }

    @Override
    public CompetencyFrameworkResponse updateCompetencyFramework(
            Long id,
            CompetencyFrameworkRequest request) {

        CompetencyFramework framework = competencyFrameworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competency Framework not found"));
        if (competencyFrameworkRepository.existsByJobRoleIdAndIdNot(
                request.getJobRoleId(), id)) {

            throw new RuntimeException("Competency Framework already exists for this Job Role");
        }


        JobRole jobRole = jobRoleRepository.findById(request.getJobRoleId())
                .orElseThrow(() -> new RuntimeException("Job Role not found"));

        User createdBy = userRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        framework.setJobRole(jobRole);
        framework.setCreatedBy(createdBy);

        if (request.getDepartmentId() != null) {

            Department department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));

            framework.setDepartment(department);

        } else {

            framework.setDepartment(null);
        }

        framework = competencyFrameworkRepository.save(framework);

        Long departmentId = framework.getDepartment() != null
                ? framework.getDepartment().getId()
                : null;

        List<User> users = userRepository.findByJobRole(framework.getJobRole());

        for (User user : users) {
            skillGapService.analyzeSkillGap(
                    new SkillGapRequest(user.getId()),
                    AnalysisTrigger.FRAMEWORK_UPDATE
            );
        }

        return new CompetencyFrameworkResponse(
                framework.getId(),
                framework.getJobRole().getId(),
                departmentId,
                framework.getVersion(),
                framework.getIsActive(),
                framework.getCreatedBy().getId()
        );
    }


    @Override
    public void deleteCompetencyFrameworkById(Long id) {

        if (!competencyFrameworkRepository.existsById(id)) {
            throw new RuntimeException("Competency Framework not found");
        }

        competencyFrameworkRepository.deleteById(id);
    }
}
