package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeRequest;
import com.knowledgegap.knowledge_gap_platform.dto.SessionAttendeeResponse;
import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.SessionAttendee;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeSessionRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SessionAttendeeRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.SessionAttendeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionAttendeeServiceImpl implements SessionAttendeeService {

    private final SessionAttendeeRepository sessionAttendeeRepository;
    private final KnowledgeSessionRepository knowledgeSessionRepository;
    private final UserRepository userRepository;

    @Override
    public SessionAttendeeResponse registerAttendee(SessionAttendeeRequest request) {

        KnowledgeSession session = knowledgeSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new EntityNotFoundException("Knowledge Session not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        SessionAttendee attendee = SessionAttendee.builder()
                .session(session)
                .user(user)
                .attendanceStatus(request.getAttendanceStatus())
                .feedbackRating(request.getFeedbackRating())
                .feedbackText(request.getFeedbackText())
                .build();

        return mapToResponse(sessionAttendeeRepository.save(attendee));
    }

    @Override
    public SessionAttendeeResponse getAttendeeById(Long id) {

        SessionAttendee attendee = sessionAttendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found"));

        return mapToResponse(attendee);
    }

    @Override
    public List<SessionAttendeeResponse> getAllAttendees() {

        return sessionAttendeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<SessionAttendeeResponse> getAttendeesBySession(Long sessionId) {

        KnowledgeSession session = knowledgeSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Knowledge Session not found"));

        return sessionAttendeeRepository.findBySession(session)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<SessionAttendeeResponse> getAttendanceHistory(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return sessionAttendeeRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public SessionAttendeeResponse updateAttendanceStatus(
            Long id,
            AttendanceStatus attendanceStatus) {

        SessionAttendee attendee = sessionAttendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found"));

        attendee.setAttendanceStatus(attendanceStatus);

        return mapToResponse(sessionAttendeeRepository.save(attendee));
    }

    @Override
    public SessionAttendeeResponse submitFeedback(
            Long id,
            Integer feedbackRating,
            String feedbackText) {

        SessionAttendee attendee = sessionAttendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found"));

        attendee.setFeedbackRating(feedbackRating);
        attendee.setFeedbackText(feedbackText);

        return mapToResponse(sessionAttendeeRepository.save(attendee));
    }

    @Override
    public void deleteAttendee(Long id) {

        SessionAttendee attendee = sessionAttendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found"));

        sessionAttendeeRepository.delete(attendee);
    }

    private SessionAttendeeResponse mapToResponse(SessionAttendee attendee) {

        return SessionAttendeeResponse.builder()
                .id(attendee.getId())

                .sessionId(attendee.getSession().getId())
                .sessionTitle(attendee.getSession().getTitle())

                .userId(attendee.getUser().getId())
                .userName(attendee.getUser().getFullName())

                .attendanceStatus(attendee.getAttendanceStatus())
                .feedbackRating(attendee.getFeedbackRating())
                .feedbackText(attendee.getFeedbackText())

                .build();
    }
}