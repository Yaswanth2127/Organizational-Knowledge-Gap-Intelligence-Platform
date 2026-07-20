package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.RecommendationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.RecommendationResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Recommendation;
import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.RecommendationRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillGapRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.RecommendationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final SkillGapRepository skillGapRepository;

    @Override
    public RecommendationResponse createRecommendation(RecommendationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        SkillGap skillGap = null;

        if (request.getSkillGapId() != null) {
            skillGap = skillGapRepository.findById(request.getSkillGapId())
                    .orElseThrow(() -> new EntityNotFoundException("Skill Gap not found"));
        }

        if (recommendationRepository
                .findByUserAndCourseAndSkillGap(user, course, skillGap)
                .isPresent()) {

            throw new RuntimeException("Recommendation already exists.");
        }

        Recommendation recommendation = Recommendation.builder()
                .user(user)
                .course(course)
                .skillGap(skillGap)
                .relevanceScore(request.getRelevanceScore())
                .reason(request.getReason())
                .accepted(
                        request.getAccepted() == null
                                ? Boolean.FALSE
                                : request.getAccepted()
                )
                .build();

        Recommendation saved = recommendationRepository.save(recommendation);

        return mapToResponse(saved);
    }

    @Override
    public RecommendationResponse updateRecommendation(Long id,
                                                       RecommendationRequest request) {

        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recommendation not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        SkillGap skillGap = null;

        if (request.getSkillGapId() != null) {
            skillGap = skillGapRepository.findById(request.getSkillGapId())
                    .orElseThrow(() -> new EntityNotFoundException("Skill Gap not found"));
        }

        recommendation.setUser(user);
        recommendation.setCourse(course);
        recommendation.setSkillGap(skillGap);
        recommendation.setRelevanceScore(request.getRelevanceScore());
        recommendation.setReason(request.getReason());

        if (request.getAccepted() != null) {
            recommendation.setAccepted(request.getAccepted());
        }

        Recommendation updated = recommendationRepository.save(recommendation);

        return mapToResponse(updated);
    }

    @Override
    public RecommendationResponse getRecommendationById(Long id) {

        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recommendation not found"));

        return mapToResponse(recommendation);
    }

    @Override
    public List<RecommendationResponse> getAllRecommendations() {

        return recommendationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteRecommendation(Long id) {

        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recommendation not found"));

        recommendationRepository.delete(recommendation);
    }

    private RecommendationResponse mapToResponse(Recommendation recommendation) {

        return RecommendationResponse.builder()
                .id(recommendation.getId())
                .userId(recommendation.getUser().getId())
                .userName(recommendation.getUser().getFullName())
                .courseId(recommendation.getCourse().getId())
                .courseTitle(recommendation.getCourse().getTitle())
                .skillGapId(
                        recommendation.getSkillGap() != null
                                ? recommendation.getSkillGap().getId()
                                : null
                )
                .relevanceScore(recommendation.getRelevanceScore())
                .reason(recommendation.getReason())
                .accepted(recommendation.getAccepted())
                .generatedAt(recommendation.getGeneratedAt())
                .build();
    }
}