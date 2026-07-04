package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "framework_required_skills",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"framework_id", "skill_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class FrameworkRequiredSkills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "framework_id", nullable = false)
    private CompetencyFramework framework;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "required_proficiency", nullable = false)
    private ProficiencyLevel requiredProficiency;

    @Column(nullable = false)
    private Double weight = 1.0;
}
