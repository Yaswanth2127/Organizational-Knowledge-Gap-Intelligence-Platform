package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
    @JoinColumn(name = "approved_by")
    private User approvedBy;

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

    @Builder.Default
    @Column(nullable = false)
    private Boolean passed=false;

    @Column(name = "assessed_at",nullable = false)
    private LocalDateTime assessedAt;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AssessmentStatus status = AssessmentStatus.PENDING;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProficiencyLevel targetLevel;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(length = 500)
    private String remarks;

    @PrePersist
    public void prePersist() {
        if (assessedAt == null) {
            assessedAt = LocalDateTime.now();
        }
    }
}
