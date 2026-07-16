package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "learning_paths")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LearningPath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @Builder.Default
    @Column(name = "generated_by",nullable = false)
    @Enumerated(EnumType.STRING)
    private RecommendationSource generatedBy=RecommendationSource.AI;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LearningPathStatus status=LearningPathStatus.ACTIVE;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreatedAt(){
        if(createdAt==null){
            createdAt=LocalDateTime.now();
        }
    }
}
