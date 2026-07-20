package com.knowledgegap.knowledge_gap_platform.service.impl;

import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Enrollment;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.enums.TrainingStatus;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.EnrollmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.EnrollmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    public EnrollmentResponse enroll(EnrollmentRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        if (enrollmentRepository.findByUserAndCourse(user, course).isPresent()) {
            throw new RuntimeException("User is already enrolled in this course.");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .status(
                        request.getStatus() == null
                                ? TrainingStatus.NOT_STARTED
                                : request.getStatus()
                )
                .progressPercent(
                        request.getProgressPercent() == null
                                ? BigDecimal.ZERO
                                : request.getProgressPercent()
                )
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        return mapToResponse(saved);
    }

    @Override
    public EnrollmentResponse update(Long id, EnrollmentRequest request) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found"));

        if (request.getStatus() != null) {
            enrollment.setStatus(request.getStatus());
        }

        if (request.getProgressPercent() != null) {
            enrollment.setProgressPercent(request.getProgressPercent());
        }

        enrollment.setLastAccessedAt(LocalDateTime.now());

        if (enrollment.getProgressPercent() != null
                && enrollment.getProgressPercent().compareTo(BigDecimal.valueOf(100)) >= 0) {

            enrollment.setCompletedAt(LocalDateTime.now());

            enrollment.setStatus(TrainingStatus.COMPLETED);
        }

        Enrollment updated = enrollmentRepository.save(enrollment);

        return mapToResponse(updated);
    }

    @Override
    public EnrollmentResponse getById(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found"));

        return mapToResponse(enrollment);
    }

    @Override
    public List<EnrollmentResponse> getAll() {

        return enrollmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found"));

        enrollmentRepository.delete(enrollment);
    }

    private EnrollmentResponse mapToResponse(Enrollment enrollment) {

        return EnrollmentResponse.builder()
                .id(enrollment.getId())

                .userId(enrollment.getUser().getId())
                .userName(enrollment.getUser().getFullName())

                .courseId(enrollment.getCourse().getId())
                .courseTitle(enrollment.getCourse().getTitle())

                .status(enrollment.getStatus())
                .progressPercent(enrollment.getProgressPercent())

                .enrolledAt(enrollment.getEnrolledAt())
                .lastAccessedAt(enrollment.getLastAccessedAt())
                .completedAt(enrollment.getCompletedAt())

                .build();
    }
}