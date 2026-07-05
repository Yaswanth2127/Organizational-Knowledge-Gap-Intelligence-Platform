package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeSkillResponse;
import com.knowledgegap.knowledge_gap_platform.entity.EmployeeSkill;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.EmployeeSkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.EmployeeSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeSkillServiceImpl implements EmployeeSkillService {

    private final EmployeeSkillRepository employeeSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public EmployeeSkillResponse addEmployeeSkill(EmployeeSkillRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        EmployeeSkill employeeSkill = EmployeeSkill.builder()
                .user(user)
                .skill(skill)
                .selfRating(request.getSelfRating())
                .peerRating(request.getPeerRating())
                .managerRating(request.getManagerRating())
                .finalRating(request.getFinalRating())
                .lastAssessedAt(LocalDateTime.now())
                .build();

        employeeSkill = employeeSkillRepository.save(employeeSkill);

        return new EmployeeSkillResponse(
                employeeSkill.getId(),
                employeeSkill.getUser().getId(),
                employeeSkill.getUser().getFullName(),
                employeeSkill.getSkill().getId(),
                employeeSkill.getSkill().getName(),
                employeeSkill.getSelfRating(),
                employeeSkill.getPeerRating(),
                employeeSkill.getManagerRating(),
                employeeSkill.getFinalRating()
        );
    }

    @Override
    public List<EmployeeSkillResponse> getAllEmployeeSkills() {

        return employeeSkillRepository.findAll()
                .stream()
                .map(employeeSkill -> new EmployeeSkillResponse(
                        employeeSkill.getId(),
                        employeeSkill.getUser().getId(),
                        employeeSkill.getUser().getFullName(),
                        employeeSkill.getSkill().getId(),
                        employeeSkill.getSkill().getName(),
                        employeeSkill.getSelfRating(),
                        employeeSkill.getPeerRating(),
                        employeeSkill.getManagerRating(),
                        employeeSkill.getFinalRating()
                ))
                .toList();
    }

    @Override
    public EmployeeSkillResponse getEmployeeSkillById(Long id) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        return new EmployeeSkillResponse(
                employeeSkill.getId(),
                employeeSkill.getUser().getId(),
                employeeSkill.getUser().getFullName(),
                employeeSkill.getSkill().getId(),
                employeeSkill.getSkill().getName(),
                employeeSkill.getSelfRating(),
                employeeSkill.getPeerRating(),
                employeeSkill.getManagerRating(),
                employeeSkill.getFinalRating()
        );
    }

    @Override
    public EmployeeSkillResponse updateEmployeeSkill(Long id,
                                                     EmployeeSkillRequest request) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        employeeSkill.setUser(user);
        employeeSkill.setSkill(skill);
        employeeSkill.setSelfRating(request.getSelfRating());
        employeeSkill.setPeerRating(request.getPeerRating());
        employeeSkill.setManagerRating(request.getManagerRating());
        employeeSkill.setFinalRating(request.getFinalRating());
        employeeSkill.setLastAssessedAt(LocalDateTime.now());

        employeeSkill = employeeSkillRepository.save(employeeSkill);

        return new EmployeeSkillResponse(
                employeeSkill.getId(),
                employeeSkill.getUser().getId(),
                employeeSkill.getUser().getFullName(),
                employeeSkill.getSkill().getId(),
                employeeSkill.getSkill().getName(),
                employeeSkill.getSelfRating(),
                employeeSkill.getPeerRating(),
                employeeSkill.getManagerRating(),
                employeeSkill.getFinalRating()
        );
    }

    @Override
    public void deleteEmployeeSkill(Long id) {

        if (!employeeSkillRepository.existsById(id)) {
            throw new RuntimeException("Employee Skill not found");
        }

        employeeSkillRepository.deleteById(id);
    }
}