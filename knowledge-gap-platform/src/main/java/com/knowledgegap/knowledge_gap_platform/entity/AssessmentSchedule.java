package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "assessment_schedules")
public class AssessmentSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;


    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;


    @Column(nullable = false)
    private String title;


    @Column(nullable = false)
    private LocalDateTime scheduledDate;


    @Builder.Default
    @Column(nullable = false)
    private Boolean completed = false;



    // Reminder fields

    @Builder.Default
    @Column(nullable = false)
    private Boolean reminderSent = false;


    private LocalDateTime reminderSentAt;



    @Column(nullable = false)
    private LocalDateTime createdAt;


    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

    }
}