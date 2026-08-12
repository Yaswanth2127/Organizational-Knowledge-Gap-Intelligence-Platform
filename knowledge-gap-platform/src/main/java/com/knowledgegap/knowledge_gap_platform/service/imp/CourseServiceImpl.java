package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.CourseRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CourseResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final SkillRepository skillRepository;

    @Override
    public CourseResponse createCourse(CourseRequest request) {

        if (courseRepository.existsByTitle(request.getTitle())) {
            throw new RuntimeException("Course already exists.");
        }

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .skill(skill)
                .source(request.getSource())
                .provider(request.getProvider())
                .externalUrl(request.getExternalUrl())
                .durationHours(request.getDurationHours())
                .difficulty(request.getDifficulty())
                .thumbnailUrl(request.getThumbnailUrl())
                .isActive(request.getIsActive() == null || request.getIsActive())
                .build();

        Course savedCourse = courseRepository.save(course);

        savedCourse = courseRepository.findById(savedCourse.getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(savedCourse);
    }

    @Override
    public CourseResponse getCourseById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        return mapToResponse(course);
    }

    @Override
    public List<CourseResponse> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CourseResponse> getActiveCourses() {

        return courseRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CourseResponse> getCoursesBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        return courseRepository.findBySkillAndIsActiveTrue(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    @Override
    public CourseResponse updateCourse(Long id, CourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setSkill(skill);
        course.setSource(request.getSource());
        course.setProvider(request.getProvider());
        course.setExternalUrl(request.getExternalUrl());
        course.setDurationHours(request.getDurationHours());
        course.setDifficulty(request.getDifficulty());
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setIsActive(request.getIsActive());

        Course updated = courseRepository.save(course);

        return mapToResponse(updated);
    }

    @Override
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        courseRepository.delete(course);
    }

    private CourseResponse mapToResponse(Course course) {

        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .skillId(course.getSkill().getId())
                .skillName(course.getSkill().getName())
                .source(course.getSource())
                .provider(course.getProvider())
                .externalUrl(course.getExternalUrl())
                .durationHours(course.getDurationHours())
                .difficulty(course.getDifficulty())
                .thumbnailUrl(course.getThumbnailUrl())
                .isActive(course.getIsActive())
                .createdAt(course.getCreatedAt())
                .build();
    }
}