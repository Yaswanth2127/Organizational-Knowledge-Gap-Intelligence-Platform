package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.AssessmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AssessmentResponse;
import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final SkillRepository skillRepository;

    @Override
    public AssessmentResponse createAssessment(AssessmentRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        Assessment assessment = Assessment.builder()
                .user(user)
                .course(course)
                .skill(skill)
                .title(request.getTitle())
                .score(request.getScore())
                .passingScore(request.getPassingScore())
                .passed(
                        request.getScore().compareTo(request.getPassingScore()) >= 0
                )
                .build();

        return mapToResponse(assessmentRepository.save(assessment));
    }

    @Override
    public AssessmentResponse getAssessmentById(Long id) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));

        return mapToResponse(assessment);
    }

    @Override
    public List<AssessmentResponse> getAllAssessments() {

        return assessmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentResponse> getAssessmentsByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return assessmentRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentResponse> getAssessmentsByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        return assessmentRepository.findByCourse(course)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentResponse> getAssessmentsBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        return assessmentRepository.findBySkill(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public AssessmentResponse updateAssessment(Long id,
                                               AssessmentRequest request) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        assessment.setUser(user);
        assessment.setCourse(course);
        assessment.setSkill(skill);
        assessment.setTitle(request.getTitle());
        assessment.setScore(request.getScore());
        assessment.setPassingScore(request.getPassingScore());

        assessment.setPassed(
                request.getScore().compareTo(request.getPassingScore()) >= 0
        );

        return mapToResponse(
                assessmentRepository.save(assessment)
        );
    }

    @Override
    public void deleteAssessment(Long id) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));

        assessmentRepository.delete(assessment);
    }

    private AssessmentResponse mapToResponse(Assessment assessment) {

        return AssessmentResponse.builder()
                .id(assessment.getId())

                .userId(assessment.getUser().getId())
                .userName(assessment.getUser().getFullName())

                .courseId(assessment.getCourse().getId())
                .courseTitle(assessment.getCourse().getTitle())

                .skillId(assessment.getSkill().getId())
                .skillName(assessment.getSkill().getName())

                .title(assessment.getTitle())
                .score(assessment.getScore())
                .passingScore(assessment.getPassingScore())
                .passed(assessment.getPassed())
                .assessedAt(assessment.getAssessedAt())
                .build();
    }
}