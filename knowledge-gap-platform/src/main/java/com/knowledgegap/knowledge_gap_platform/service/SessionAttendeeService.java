package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;

import java.util.List;

public interface SessionAttendeeService {
    SessionAttendeeResponse registerAttendee(SessionAttendeeRequest request);

    SessionAttendeeResponse getAttendeeById(Long id);

    List<SessionAttendeeResponse> getAllAttendees();

    List<SessionAttendeeResponse> getAttendeesBySession(Long sessionId);

    List<SessionAttendeeResponse> getAttendanceHistory(Long userId);

    SessionAttendeeResponse updateAttendanceStatus(Long id, AttendanceStatus attendanceStatus);

    SessionAttendeeResponse submitFeedback(Long id, Integer feedbackRating, String feedbackText);

    void deleteAttendee(Long id);
}
