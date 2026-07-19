package com.knowledgegap.knowledge_gap_platform.entity;
import com.knowledgegap.knowledge_gap_platform.enums.TrainingStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments",uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {
                        "user_id",
                        "course_id"
                }
        )
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id",nullable = false)
    private Course course;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrainingStatus status=TrainingStatus.NOT_STARTED;

    @Builder.Default
    @Column(name = "progress_percent",nullable = false, precision = 5,scale = 2)
    private BigDecimal progressPercent=BigDecimal.ZERO;

    @Column(name = "enrolled_at",nullable = false)
    private LocalDateTime enrolledAt;

    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    public void onCreate() {
        if (enrolledAt == null) {
            enrolledAt = LocalDateTime.now();
        }
        if (progressPercent == null) {
            progressPercent = BigDecimal.ZERO;
        }
        if (status == null) {
            status = TrainingStatus.NOT_STARTED;
        }
    }
}
