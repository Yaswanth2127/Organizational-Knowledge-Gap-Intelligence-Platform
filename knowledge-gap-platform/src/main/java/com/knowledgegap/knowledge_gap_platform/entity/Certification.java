package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "certifications")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(nullable = false,length = 200)
    private String name;

    @Column(length = 150)
    private String issuer;

    @Column(name = "credential_url", length = 500)
    private String credentialUrl;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "issue_date")
    private LocalDate  issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id")
    private Assessment assessment;

    @PrePersist
    public void prePersist(){
        createdAt=LocalDateTime.now();
    }
}
