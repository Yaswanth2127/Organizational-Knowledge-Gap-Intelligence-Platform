package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AttendanceStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionAttendeeRequest {

    @NotNull
    private Long sessionId;

    @NotNull
    private Long userId;

    @Builder.Default
    private AttendanceStatus attendanceStatus = AttendanceStatus.REGISTERED;

    @Min(1)
    @Max(5)
    private Integer feedbackRating;

    private String feedbackText;
}