package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.AssessmentScheduleRequest;
import com.knowledgegap.knowledge_gap_platform.dto.AssessmentScheduleResponse;
import com.knowledgegap.knowledge_gap_platform.service.AssessmentScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment-schedules")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AssessmentScheduleController {

    private final AssessmentScheduleService assessmentScheduleService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssessmentScheduleResponse createSchedule(
            @Valid @RequestBody AssessmentScheduleRequest request) {

        return assessmentScheduleService.createSchedule(request);
    }

    @GetMapping("/{id}")
    public AssessmentScheduleResponse getScheduleById(
            @PathVariable Long id) {

        return assessmentScheduleService.getScheduleById(id);
    }

    @GetMapping
    public List<AssessmentScheduleResponse> getAllSchedules() {

        return assessmentScheduleService.getAllSchedules();
    }

    @GetMapping("/user/{userId}")
    public List<AssessmentScheduleResponse> getSchedulesByUser(
            @PathVariable Long userId) {

        return assessmentScheduleService.getSchedulesByUser(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<AssessmentScheduleResponse> getSchedulesByCourse(
            @PathVariable Long courseId) {

        return assessmentScheduleService.getSchedulesByCourse(courseId);
    }

    @GetMapping("/skill/{skillId}")
    public List<AssessmentScheduleResponse> getSchedulesBySkill(
            @PathVariable Long skillId) {

        return assessmentScheduleService.getSchedulesBySkill(skillId);
    }

    @GetMapping("/completed")
    public List<AssessmentScheduleResponse> getCompletedSchedules() {

        return assessmentScheduleService.getCompletedSchedules();
    }

    @GetMapping("/pending")
    public List<AssessmentScheduleResponse> getPendingSchedules() {

        return assessmentScheduleService.getPendingSchedules();
    }

    @PutMapping("/{id}")
    public AssessmentScheduleResponse updateSchedule(
            @PathVariable Long id,
            @Valid @RequestBody AssessmentScheduleRequest request) {

        return assessmentScheduleService.updateSchedule(id, request);
    }

    @PutMapping("/{id}/complete")
    public void markCompleted(@PathVariable Long id) {

        assessmentScheduleService.markCompleted(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSchedule(@PathVariable Long id) {

        assessmentScheduleService.deleteSchedule(id);
    }
}