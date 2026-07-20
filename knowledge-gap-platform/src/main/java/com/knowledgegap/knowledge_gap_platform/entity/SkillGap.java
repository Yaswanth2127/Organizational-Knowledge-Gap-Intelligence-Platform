package com.knowledgegap.knowledge_gap_platform.entity;


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

@Entity
@Table(name = "skill_gaps")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SkillGap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "framework_id")
    private CompetencyFramework framework;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "required_level",nullable = false)
    private ProficiencyLevel requiredLevel;


    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "current_level",nullable = false)
    private ProficiencyLevel currentLevel;

    @Column(name = "gap_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal gapScore;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GapSeverity severity;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false )
    private GapStatus status=GapStatus.OPEN;


    @Column(name = "detected_at",nullable = false)
    private LocalDateTime detectedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;


    @PrePersist
    public void prePersist() {
        if (detectedAt == null) {
            detectedAt = LocalDateTime.now();
        }
    }


}
