package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "learning_path_courses",uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {
                        "learning_path_id",
                        "sequence_order"
                }
        )
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPathCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_path_id",nullable = false)
    private LearningPath learningPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id",nullable = false)
    private Course course;

    @Column(name = "sequence_order",nullable = false)
    private Integer sequenceOrder;

    @Column(name = "estimates_days")
    private Integer estimatedDays;
}
