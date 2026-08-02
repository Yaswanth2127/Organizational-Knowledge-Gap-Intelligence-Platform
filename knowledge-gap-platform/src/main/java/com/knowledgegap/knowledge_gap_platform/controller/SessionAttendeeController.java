package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;
import com.knowledgegap.knowledge_gap_platform.service.SessionAttendeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/session-attendees")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SessionAttendeeController {

    private final SessionAttendeeService sessionAttendeeService;

    // Register attendee
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SessionAttendeeResponse registerAttendee(
            @Valid @RequestBody SessionAttendeeRequest request) {

        return sessionAttendeeService.registerAttendee(request);
    }

    // Get attendee by id
    @GetMapping("/{id}")
    public SessionAttendeeResponse getAttendeeById(
            @PathVariable Long id) {

        return sessionAttendeeService.getAttendeeById(id);
    }

    // Get all attendees
    @GetMapping
    public List<SessionAttendeeResponse> getAllAttendees() {

        return sessionAttendeeService.getAllAttendees();
    }

    // View attendees of a session
    @GetMapping("/session/{sessionId}")
    public List<SessionAttendeeResponse> getAttendeesBySession(
            @PathVariable Long sessionId) {

        return sessionAttendeeService.getAttendeesBySession(sessionId);
    }

    // Attendance history
    @GetMapping("/user/{userId}")
    public List<SessionAttendeeResponse> getAttendanceHistory(
            @PathVariable Long userId) {

        return sessionAttendeeService.getAttendanceHistory(userId);
    }

    // Update attendance status
    @PutMapping("/{id}/status")
    public SessionAttendeeResponse updateAttendanceStatus(
            @PathVariable Long id,
            @RequestParam AttendanceStatus attendanceStatus) {

        return sessionAttendeeService.updateAttendanceStatus(
                id,
                attendanceStatus
        );
    }

    // Submit feedback
    @PutMapping("/{id}/feedback")
    public SessionAttendeeResponse submitFeedback(
            @PathVariable Long id,
            @RequestParam Integer feedbackRating,
            @RequestParam String feedbackText) {

        return sessionAttendeeService.submitFeedback(
                id,
                feedbackRating,
                feedbackText
        );
    }

    // Delete attendee
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttendee(
            @PathVariable Long id) {

        sessionAttendeeService.deleteAttendee(id);
    }
}