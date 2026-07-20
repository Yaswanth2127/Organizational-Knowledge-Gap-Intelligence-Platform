package com.knowledgegap.knowledge_gap_platform.service.impl;

import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.LearningPathCourseResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPathCourse;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.LearningPathCourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.LearningPathRepository;
import com.knowledgegap.knowledge_gap_platform.service.LearningPathCourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningPathCourseServiceImpl implements LearningPathCourseService {

    private final LearningPathCourseRepository learningPathCourseRepository;
    private final LearningPathRepository learningPathRepository;
    private final CourseRepository courseRepository;

    @Override
    public LearningPathCourseResponse create(LearningPathCourseRequest request) {

        LearningPath learningPath = learningPathRepository.findById(request.getLearningPathId())
                .orElseThrow(() -> new EntityNotFoundException("Learning Path not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        if (learningPathCourseRepository
                .findByLearningPathAndSequenceOrder(
                        learningPath,
                        request.getSequenceOrder())
                .isPresent()) {

            throw new RuntimeException(
                    "Sequence order already exists for this learning path.");
        }

        LearningPathCourse learningPathCourse = LearningPathCourse.builder()
                .learningPath(learningPath)
                .course(course)
                .sequenceOrder(request.getSequenceOrder())
                .estimatedDays(request.getEstimatedDays())
                .build();

        LearningPathCourse saved =
                learningPathCourseRepository.save(learningPathCourse);

        return mapToResponse(saved);
    }

    @Override
    public LearningPathCourseResponse update(
            Long id,
            LearningPathCourseRequest request) {

        LearningPathCourse learningPathCourse =
                learningPathCourseRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException("Learning Path Course not found"));

        LearningPath learningPath =
                learningPathRepository.findById(request.getLearningPathId())
                        .orElseThrow(() ->
                                new EntityNotFoundException("Learning Path not found"));

        Course course =
                courseRepository.findById(request.getCourseId())
                        .orElseThrow(() ->
                                new EntityNotFoundException("Course not found"));

        if (!learningPathCourse.getSequenceOrder().equals(request.getSequenceOrder())) {

            if (learningPathCourseRepository
                    .findByLearningPathAndSequenceOrder(
                            learningPath,
                            request.getSequenceOrder())
                    .isPresent()) {

                throw new RuntimeException(
                        "Sequence order already exists for this learning path.");
            }
        }

        learningPathCourse.setLearningPath(learningPath);
        learningPathCourse.setCourse(course);
        learningPathCourse.setSequenceOrder(request.getSequenceOrder());
        learningPathCourse.setEstimatedDays(request.getEstimatedDays());

        LearningPathCourse updated =
                learningPathCourseRepository.save(learningPathCourse);

        return mapToResponse(updated);
    }

    @Override
    public LearningPathCourseResponse getById(Long id) {

        LearningPathCourse learningPathCourse =
                learningPathCourseRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException("Learning Path Course not found"));

        return mapToResponse(learningPathCourse);
    }

    @Override
    public List<LearningPathCourseResponse> getAll() {

        return learningPathCourseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {

        LearningPathCourse learningPathCourse =
                learningPathCourseRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException("Learning Path Course not found"));

        learningPathCourseRepository.delete(learningPathCourse);
    }

    private LearningPathCourseResponse mapToResponse(LearningPathCourse entity) {

        return LearningPathCourseResponse.builder()
                .id(entity.getId())
                .learningPathId(entity.getLearningPath().getId())
                .courseId(entity.getCourse().getId())
                .courseTitle(entity.getCourse().getTitle())
                .sequenceOrder(entity.getSequenceOrder())
                .estimatedDays(entity.getEstimatedDays())
                .build();
    }
}