package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentScheduleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.assessment.AssessmentScheduleResponse;
import com.knowledgegap.knowledge_gap_platform.entity.AssessmentSchedule;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentScheduleRepository;
import com.knowledgegap.knowledge_gap_platform.repository.CourseRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentScheduleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentScheduleServiceImpl
        implements AssessmentScheduleService {

    private final AssessmentScheduleRepository assessmentScheduleRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final SkillRepository skillRepository;

    @Override
    public AssessmentScheduleResponse createSchedule(
            AssessmentScheduleRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        AssessmentSchedule schedule = AssessmentSchedule.builder()
                .user(user)
                .course(course)
                .skill(skill)
                .title(request.getTitle())
                .scheduledDate(request.getScheduledDate())
                .completed(false)
                .build();

        return mapToResponse(
                assessmentScheduleRepository.save(schedule));
    }

    @Override
    public AssessmentScheduleResponse getScheduleById(Long id) {

        AssessmentSchedule schedule =
                assessmentScheduleRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Schedule not found"));

        return mapToResponse(schedule);
    }

    @Override
    public List<AssessmentScheduleResponse> getAllSchedules() {

        return assessmentScheduleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentScheduleResponse> getSchedulesByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return assessmentScheduleRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentScheduleResponse> getSchedulesByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        return assessmentScheduleRepository.findByCourse(course)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentScheduleResponse> getSchedulesBySkill(Long skillId) {

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        return assessmentScheduleRepository.findBySkill(skill)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentScheduleResponse> getCompletedSchedules() {

        return assessmentScheduleRepository.findByCompleted(true)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AssessmentScheduleResponse> getPendingSchedules() {

        return assessmentScheduleRepository.findByCompleted(false)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public AssessmentScheduleResponse updateSchedule(
            Long id,
            AssessmentScheduleRequest request) {

        AssessmentSchedule schedule =
                assessmentScheduleRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Schedule not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Course not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Skill not found"));

        schedule.setUser(user);
        schedule.setCourse(course);
        schedule.setSkill(skill);
        schedule.setTitle(request.getTitle());
        schedule.setScheduledDate(request.getScheduledDate());

        return mapToResponse(
                assessmentScheduleRepository.save(schedule));
    }

    @Override
    public void markCompleted(Long id) {

        AssessmentSchedule schedule =
                assessmentScheduleRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Schedule not found"));

        schedule.setCompleted(true);

        assessmentScheduleRepository.save(schedule);
    }

    @Override
    public void deleteSchedule(Long id) {

        AssessmentSchedule schedule =
                assessmentScheduleRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Schedule not found"));

        assessmentScheduleRepository.delete(schedule);
    }

    private AssessmentScheduleResponse mapToResponse(
            AssessmentSchedule schedule) {

        return AssessmentScheduleResponse.builder()
                .id(schedule.getId())

                .userId(schedule.getUser().getId())
                .userName(schedule.getUser().getFullName())

                .courseId(schedule.getCourse().getId())
                .courseTitle(schedule.getCourse().getTitle())

                .skillId(schedule.getSkill().getId())
                .skillName(schedule.getSkill().getName())

                .title(schedule.getTitle())
                .scheduledDate(schedule.getScheduledDate())
                .completed(schedule.getCompleted())
                .createdAt(schedule.getCreatedAt())
                .build();
    }
}