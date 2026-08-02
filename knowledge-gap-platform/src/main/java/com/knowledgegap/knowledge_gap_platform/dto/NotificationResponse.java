package com.knowledgegap.knowledge_gap_platform.dto;

import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationChannel;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;

    private Long userId;
    private String userName;

    private String type;

    private NotificationChannel channel;

    private String title;

    private String message;

    private NotificationStatus status;

    private LocalDateTime readAt;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;
}