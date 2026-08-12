package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryRequest;
import com.knowledgegap.knowledge_gap_platform.dto.ExpertDirectoryResponse;
import com.knowledgegap.knowledge_gap_platform.entity.ExpertDirectory;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.ExpertDirectoryRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.ExpertDirectoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpertDirectoryServiceImpl implements ExpertDirectoryService {
    private final ExpertDirectoryRepository expertDirectoryRepository;
    private final SkillRepository skillRepository;
    private final AuthenticationService authenticationService;

    @Override
    public ExpertDirectoryResponse addExpert(ExpertDirectoryRequest request) {
        User user=authenticationService.getCurrentUser();
        if (expertDirectoryRepository.existsByUserIdAndSkillId(
                user.getId(),
                request.getSkillId())) {

            throw new IllegalArgumentException(
                    "Expert already exists for this user and skill."
            );
        }

        Skill skill=skillRepository.findById(request.getSkillId()).orElseThrow(()->
                new ResourceNotFoundException("Skill not found "));

        ExpertDirectory expertDirectory=ExpertDirectory.builder()
                .user(user)
                .skill(skill)
                .expertiseLevel(request.getExpertiseLevel())
                .build();
        return mapToExpertDirectoryResponse(expertDirectoryRepository.save(expertDirectory));
    }

    @Override
    public ExpertDirectoryResponse updateExpert(Long id,ExpertDirectoryRequest request) {
        ExpertDirectory expertDirectory = expertDirectoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expert directory not found"));

        User user = authenticationService.getCurrentUser();

        if (!expertDirectory.getUser().getId()
                .equals(user.getId())) {

            throw new AccessDeniedException(
                    "You are not authorized to update this expert profile."
            );
        }

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found"));

        expertDirectoryRepository.findByUserIdAndSkillId(
                user.getId(),
                request.getSkillId()
        ).ifPresent(existing -> {
            if (!existing.getId().equals(expertDirectory.getId())) {
                throw new IllegalArgumentException(
                        "Expert already exists for this user and skill.");
            }
        });


        expertDirectory.setUser(user);
        expertDirectory.setSkill(skill);
        expertDirectory.setExpertiseLevel(request.getExpertiseLevel());

        ExpertDirectory updatedExpert = expertDirectoryRepository.save(expertDirectory);

        return mapToExpertDirectoryResponse(updatedExpert);

    }

    @Override
    public void deleteExpert(Long id) {
        User currentUser = authenticationService.getCurrentUser();

        ExpertDirectory expertDirectory =
                expertDirectoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Expert directory not found"));

        if (!expertDirectory.getUser().getId()
                .equals(currentUser.getId())) {

            throw new AccessDeniedException(
                    "You are not authorized to delete this expert profile."
            );
        }

        expertDirectoryRepository.delete(expertDirectory);
    }

    @Override
    public ExpertDirectoryResponse getExpertById(Long id) {
        ExpertDirectory expertDirectory=expertDirectoryRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Expert directory not found "));
        return mapToExpertDirectoryResponse(expertDirectory);
    }

    @Override
    public List<ExpertDirectoryResponse> getExpertsBySkill(Long skillId) {

        return expertDirectoryRepository.findBySkillId(skillId)
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    @Override
    public List<ExpertDirectoryResponse> getExpertsByUser(Long userId) {

        return expertDirectoryRepository.findByUserId(userId)
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    @Override
    public List<ExpertDirectoryResponse> getTop5Experts() {

        return expertDirectoryRepository.findTop5ByOrderByEndorsementCountDesc()
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    @Override
    public List<ExpertDirectoryResponse> getExpertsBySkillAndLevel(Long skillId, ProficiencyLevel level) {

        return expertDirectoryRepository.findBySkillIdAndExpertiseLevel(skillId,level)
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    @Override
    public List<ExpertDirectoryResponse> getAllExperts() {
        return expertDirectoryRepository.findAll()
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    @Override
    public List<ExpertDirectoryResponse> getMyExpertise() {

        User user=authenticationService.getCurrentUser();
        return expertDirectoryRepository.findByUserId(user.getId())
                .stream().map(this::mapToExpertDirectoryResponse).toList();
    }

    private ExpertDirectoryResponse mapToExpertDirectoryResponse(ExpertDirectory expertDirectory){
        return ExpertDirectoryResponse.builder()
                .id(expertDirectory.getId())
                .skillId(expertDirectory.getSkill().getId())
                .skillName(expertDirectory.getSkill().getName())
                .userId(expertDirectory.getUser().getId())
                .employeeName(expertDirectory.getUser().getFullName())
                .employeeEmail(expertDirectory.getUser().getEmail())
                .expertiseLevel(expertDirectory.getExpertiseLevel())
                .createdAt(expertDirectory.getCreatedAt())
                .endorsementCount(expertDirectory.getEndorsementCount())
                .build();
    }
}
