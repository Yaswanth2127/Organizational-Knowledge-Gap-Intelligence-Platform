package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationChannel;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 50)
    private NotificationType type;

    @JdbcTypeCode((SqlTypes.NAMED_ENUM))
    @Enumerated(EnumType.STRING)
    @Column(name = "channel",nullable = false)
    private NotificationChannel channel;

    @Column(name = "title",length = 200,nullable = false)
    private String  title;

    @Column(name = "message",nullable = false)
    private String message;

    @Builder.Default
    @JdbcTypeCode((SqlTypes.NAMED_ENUM))
    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private NotificationStatus status=NotificationStatus.PENDING;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreated(){
        if(createdAt==null){
            createdAt=LocalDateTime.now();
        }
    }
}
