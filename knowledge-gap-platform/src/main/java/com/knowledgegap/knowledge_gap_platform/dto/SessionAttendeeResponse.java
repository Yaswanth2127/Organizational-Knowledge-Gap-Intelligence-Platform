package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionAttendeeResponse {

    private Long id;

    private Long sessionId;
    private String sessionTitle;

    private Long userId;
    private String userName;

    private AttendanceStatus attendanceStatus;

    private Integer feedbackRating;

    private String feedbackText;
}