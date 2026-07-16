package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CourseSource source=CourseSource.INTERNAL;


    @Column(length = 150)
    private String provider;

    @Column(name = "external_url",length = 500)
    private String externalUrl;

    @Column(name = "duration_hours",precision = 5,scale = 2)
    private BigDecimal durationHours;

    @Column(length = 20)
    private String difficulty;

    @Column(name = "thumbnail_url",length = 500)
    private String thumbnailUrl;

    @Builder.Default
    @Column(name = "is_active",nullable = false)
    private Boolean isActive=true;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreatedAt(){
        if(createdAt==null){
            createdAt=LocalDateTime.now();
        }
    }


}
