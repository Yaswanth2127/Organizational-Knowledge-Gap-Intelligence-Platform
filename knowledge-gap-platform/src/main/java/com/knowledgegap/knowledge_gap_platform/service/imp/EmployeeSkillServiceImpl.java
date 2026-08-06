package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.*;
import com.knowledgegap.knowledge_gap_platform.entity.EmployeeSkill;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AnalysisTrigger;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.EmployeeSkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.EmployeeSkillService;
import com.knowledgegap.knowledge_gap_platform.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeSkillServiceImpl implements EmployeeSkillService {

    private final EmployeeSkillRepository employeeSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final SkillGapService skillGapService;
    private final AuthenticationService authenticationService;

    private EmployeeSkillResponse mapToResponse(EmployeeSkill employeeSkill){
        return new EmployeeSkillResponse(
                employeeSkill.getId(),
                employeeSkill.getUser().getId(),
                employeeSkill.getUser().getFullName(),
                employeeSkill.getUser().getProfileImageUrl(),
                employeeSkill.getUser().getDepartment() != null
                        ? employeeSkill.getUser().getDepartment().getId()
                        : null,
                employeeSkill.getUser().getDepartment() != null
                        ? employeeSkill.getUser().getDepartment().getName()
                        : null,
                employeeSkill.getUser().getJobRole() != null
                        ? employeeSkill.getUser().getJobRole().getId()
                        : null,
                employeeSkill.getUser().getJobRole() != null
                        ? employeeSkill.getUser().getJobRole().getTitle()
                        : null,
                employeeSkill.getSkill().getId(),
                employeeSkill.getSkill().getName(),
                employeeSkill.getSelfRating(),
                employeeSkill.getPeerRating(),
                employeeSkill.getManagerRating(),
                employeeSkill.getFinalRating(),
                LocalDateTime.now()
        );
    }

    @Override
    public EmployeeSkillResponse addEmployeeSkill(EmployeeSkillRequest request) {


        User user = authenticationService.getCurrentUser();

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        if(employeeSkillRepository.existsByUserAndSkill(user, skill)){
            throw new IllegalArgumentException("User with that skill exists");
        }

        EmployeeSkill employeeSkill = EmployeeSkill.builder()
                .user(user)
                .skill(skill)
                .selfRating(request.getSelfRating())
                .lastAssessedAt(LocalDateTime.now())
                .build();

        employeeSkill = employeeSkillRepository.save(employeeSkill);

        skillGapService.analyzeSkillGap(new SkillGapRequest(user.getId()), AnalysisTrigger.PROFILE_UPDATE);

        return mapToResponse(employeeSkill);
    }

    @Override
    public List<EmployeeSkillResponse> getAllEmployeeSkills() {

        return employeeSkillRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmployeeSkillResponse getEmployeeSkillById(Long id) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        return mapToResponse(employeeSkill);
    }

    @Override
    public EmployeeSkillResponse updateEmployeeSkill(Long id,
                                                     EmployeeSkillRequest request) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        User user = authenticationService.getCurrentUser();

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        employeeSkill.setUser(user);
        employeeSkill.setSkill(skill);
        employeeSkill.setSelfRating(request.getSelfRating());
        employeeSkill.setLastAssessedAt(LocalDateTime.now());

        employeeSkill = employeeSkillRepository.save(employeeSkill);

        skillGapService.analyzeSkillGap(new SkillGapRequest(user.getId()),AnalysisTrigger.PROFILE_UPDATE);


        return mapToResponse(employeeSkill);
    }

    @Override
    public void deleteEmployeeSkillById(Long id) {

        if (!employeeSkillRepository.existsById(id)) {
            throw new RuntimeException("Employee Skill not found");
        }

        employeeSkillRepository.deleteById(id);
    }

    @Override
    public List<EmployeeSkillResponse> getEmployeeSkillsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found ");
        }
        return employeeSkillRepository.findByUserId(userId).stream().
                map(this::mapToResponse).toList();
    }

    @Override
    public List<EmployeeSkillResponse> getMySkills() {
        User user=authenticationService.getCurrentUser();
        return employeeSkillRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).toList();
    }

    @Override
    public List<EmployeeSkillResponse> getEligiblePeerReviews() {
        User currentUser = authenticationService.getCurrentUser();

        User manager = currentUser.getManager();

        if (manager == null) {
            throw new IllegalArgumentException("Employee is not assigned to any manager.");
        }

        List<EmployeeSkill> employeeSkills =
                employeeSkillRepository.findByUserManagerId(manager.getId());

        return employeeSkills.stream()
                // Exclude current employee
                .filter(skill -> !skill.getUser().getId().equals(currentUser.getId()))
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public EmployeeSkillResponse submitPeerReview(Long id, EmployeeSkillReviewRequest request) {
        User reviewer = authenticationService.getCurrentUser();

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee Skill not found with id : " + id));

        // Prevent self review
        if (employeeSkill.getUser().getId().equals(reviewer.getId())) {
            throw new IllegalStateException("You cannot review your own skill.");
        }

        // Prevent multiple peer reviews (optional)
        if (employeeSkill.getPeerRating() != null) {
            throw new IllegalStateException("Peer review has already been submitted.");
        }

        // Save peer rating
        employeeSkill.setPeerRating(request.getPeerRating());

        EmployeeSkill updatedEmployeeSkill =
                employeeSkillRepository.save(employeeSkill);

        return mapToResponse(updatedEmployeeSkill);
    }

    @Override
    public EmployeeSkillStatisticsResponse getStatistics() {
        User currentUser = authenticationService.getCurrentUser();

        List<EmployeeSkill> skills =
                employeeSkillRepository.findByUserId(currentUser.getId());

        long beginner = 0;
        long intermediate = 0;
        long advanced = 0;
        long expert = 0;

        for (EmployeeSkill skill : skills) {

            ProficiencyLevel level = skill.getFinalRating();

            // If assessment not completed, use self rating
            if (level == null) {
                level = skill.getSelfRating();
            }

            if (level == null) {
                continue;
            }

            switch (level) {

                case BEGINNER:
                    beginner++;
                    break;

                case INTERMEDIATE:
                    intermediate++;
                    break;

                case ADVANCED:
                    advanced++;
                    break;

                case EXPERT:
                    expert++;
                    break;

                default:
                    break;
            }
        }

        return EmployeeSkillStatisticsResponse.builder()
                .totalSkills((long) skills.size())
                .beginner(beginner)
                .intermediate(intermediate)
                .advanced(advanced)
                .expert(expert)
                .build();
    }


}