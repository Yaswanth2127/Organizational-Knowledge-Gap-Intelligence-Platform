package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "knowledge_sessions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KnowledgeSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id",nullable = false)
    private User host;

    @Column(length = 200,nullable = false)
    private String  title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_skill_id")
    private Skill topicSkill;

    @Column(name = "scheduled_at",nullable = false)
    private LocalDateTime scheduledAt;

    @Column(name = "location_link",length = 500)
    private String locationLink;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Builder.Default
    private SessionStatus status=SessionStatus.SCHEDULED;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;
    @Column(name = "ended_at", nullable = false)
    private LocalDateTime endedAt;

    @PrePersist
    public void onCreatedAt(){
        LocalDateTime now=LocalDateTime.now();
        if(createdAt==null)createdAt=now;
        if(updatedAt==null)updatedAt=now;
    }

    @PreUpdate
    public void onUpdatedAt(){
        updatedAt=LocalDateTime.now();
    }
}
