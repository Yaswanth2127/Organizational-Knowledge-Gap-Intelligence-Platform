package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name ="department_gap_summary")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentGapSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id",nullable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id",nullable = false)
    private Skill skill;

    @Column(name = "avg_gap_score" ,nullable = false,precision = 5,scale = 2)
    private BigDecimal avgGapScore;

    @Builder.Default
    @Column(name = "employees_with_gap",nullable = false)
    private Integer employeesWithGap=0;

    @Column(name = "period_start",nullable = false)
    private LocalDate periodStart;

    @Column(name = "period_end" ,nullable = false)
    private LocalDate periodEnd;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreatedAt(){
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
