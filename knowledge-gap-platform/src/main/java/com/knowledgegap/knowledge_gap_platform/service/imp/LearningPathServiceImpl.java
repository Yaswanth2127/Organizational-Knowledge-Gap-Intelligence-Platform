package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathResponse;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.RecommendationSource;
import com.knowledgegap.knowledge_gap_platform.repository.LearningPathRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.LearningPathService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningPathServiceImpl implements LearningPathService {

    private final LearningPathRepository learningPathRepository;
    private final UserRepository userRepository;

    @Override
    public LearningPathResponse create(LearningPathRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        LearningPath learningPath = LearningPath.builder()
                .user(user)
                .generatedBy(
                        request.getGeneratedBy() == null
                                ? RecommendationSource.AI
                                : request.getGeneratedBy()
                )
                .status(
                        request.getStatus() == null
                                ? LearningPathStatus.ACTIVE
                                : request.getStatus()
                )
                .build();

        LearningPath saved = learningPathRepository.save(learningPath);

        return mapToResponse(saved);
    }

    @Override
    public LearningPathResponse update(Long id, LearningPathRequest request) {

        LearningPath learningPath = learningPathRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Learning Path not found"));

        if (request.getGeneratedBy() != null) {
            learningPath.setGeneratedBy(request.getGeneratedBy());
        }

        if (request.getStatus() != null) {
            learningPath.setStatus(request.getStatus());
        }

        LearningPath updated = learningPathRepository.save(learningPath);

        return mapToResponse(updated);
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

    @Override
    public void delete(Long id) {

        LearningPath learningPath = learningPathRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Learning Path not found"));

        learningPathRepository.delete(learningPath);
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