package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathResponse;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import com.knowledgegap.knowledge_gap_platform.exception.ResourceNotFoundException;
import com.knowledgegap.knowledge_gap_platform.repository.LearningPathRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AuthenticationService;
import com.knowledgegap.knowledge_gap_platform.service.LearningPathService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class LearningPathServiceImpl implements LearningPathService {

    private final LearningPathRepository learningPathRepository;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;


    @Override
    public List<LearningPathResponse> getLearningPathByUserId(Long userId) {

        if(!userRepository.existsById(userId)){
            throw  new ResourceNotFoundException("User Details not found ");
        }
        List<LearningPath> learningPath=learningPathRepository.findByUserIdOrderByCreatedAtDesc(userId);


        return learningPath.stream().map(this::mapToResponse).toList();
    }

    @Override
    public LearningPathResponse getCurrentLearningPathByUser() {
        User user=authenticationService.getCurrentUser();
        LearningPath learningPath=learningPathRepository.findByUserIdAndStatus(user.getId(),LearningPathStatus.ACTIVE)
                .orElseThrow(()->new ResourceNotFoundException("Learning path is not found for that user id "));

        return mapToResponse(learningPath);

    }



    @Override
    public LearningPathResponse getById(Long id) {

        LearningPath learningPath = learningPathRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Learning Path not found"));

        return mapToResponse(learningPath);
    }

    @Override
    public List<LearningPathResponse> getAll() {

        return learningPathRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }



    private LearningPathResponse mapToResponse(LearningPath learningPath) {

        return LearningPathResponse.builder()
                .id(learningPath.getId())
                .userId(learningPath.getUser().getId())
                .userName(learningPath.getUser().getFullName())
                .generatedBy(learningPath.getGeneratedBy())
                .status(learningPath.getStatus())
                .createdAt(learningPath.getCreatedAt())
                .build();
    }
}