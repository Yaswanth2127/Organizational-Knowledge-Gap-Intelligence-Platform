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
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.ExpertDirectoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpertDirectoryServiceImpl implements ExpertDirectoryService {
    private final ExpertDirectoryRepository expertDirectoryRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public ExpertDirectoryResponse addExpert(ExpertDirectoryRequest request) {
        if (expertDirectoryRepository.existsByUserIdAndSkillId(
                request.getUserId(),
                request.getSkillId())) {

            throw new IllegalArgumentException(
                    "Expert already exists for this user and skill."
            );
        }
        User user=userRepository.findById(request.getUserId()).orElseThrow(()->
                new ResourceNotFoundException("User not found "));

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

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found"));

        expertDirectoryRepository.findByUserIdAndSkillId(
                request.getUserId(),
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
        if(!expertDirectoryRepository.existsById(id)){
            throw new RuntimeException("Expert Directory is not found ");
        }
        expertDirectoryRepository.deleteById(id);
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
