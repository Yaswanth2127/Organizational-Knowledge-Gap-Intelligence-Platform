package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "assessments")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id",nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id",nullable = false)
    private Skill skill;

    @Column(length = 200)
    private String  title;

    @Column(precision = 5, scale = 2)
    private BigDecimal score;

    @Builder.Default
    @Column(name = "passing_score",nullable = false,precision = 5,scale = 2)
    private BigDecimal passingScore=BigDecimal.valueOf(70);

    @Column(nullable = false)
    private Boolean passed;

    @Column(name = "assessed_at",nullable = false)
    private LocalDateTime assessedAt;

    @PrePersist
    public void prePersist() {
        if (assessedAt == null) {
            assessedAt = LocalDateTime.now();
        }
    }
}
