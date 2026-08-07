package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationChannel;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationRequest {

    @NotNull
    private Long userId;

    @NotNull
    private NotificationType type;

    @NotNull
    private NotificationChannel channel;

    @NotBlank
    private String title;

    @NotBlank
    private String message;

    private LocalDateTime expiresAt;
}