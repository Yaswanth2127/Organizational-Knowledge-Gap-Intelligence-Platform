package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name="employee_skills")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EmployeeSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "self_rating")
    private ProficiencyLevel selfRating;

    @Enumerated(EnumType.STRING)
    @Column(name = "peer_rating")
    private ProficiencyLevel peerRating;

    @Enumerated(EnumType.STRING)
    @Column(name = "manager_rating")
    private ProficiencyLevel managerRating;

    @Enumerated(EnumType.STRING)
    @Column(name = "final_rating")
    private ProficiencyLevel finalRating;

    @Column(name = "last_assessed_at")
    private LocalDateTime lastAssessedAt;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){
        createdAt=LocalDateTime.now();
    }
}
