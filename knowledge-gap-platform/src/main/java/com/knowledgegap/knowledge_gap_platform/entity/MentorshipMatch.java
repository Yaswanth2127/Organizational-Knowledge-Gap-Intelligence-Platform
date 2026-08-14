package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Table(name = "mentorship_matches")
@Check(constraints = "mentor_id <> mentee_id")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorshipMatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id",nullable = false)
    private User mentor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentee_id",nullable = false)
    private User mentee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    private MentorshipStatus status=MentorshipStatus.PENDING;

    @Column(name = "matched_at")
    private  LocalDateTime matchedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(name = "created_at",updatable = false,nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void updateTime(){
        LocalDateTime now=LocalDateTime.now();
        if(createdAt==null){
            createdAt=now;
        }
        if(updatedAt==null){
            updatedAt=now;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
