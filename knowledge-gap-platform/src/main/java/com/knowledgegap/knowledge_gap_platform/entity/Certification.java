package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "certifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --------------------------------------------------
    // User
    // --------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // --------------------------------------------------
    // Skill
    // --------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    // --------------------------------------------------
    // Certification Details
    // --------------------------------------------------

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 150)
    private String issuer;

    @Column(name = "credential_url", length = 500)
    private String credentialUrl;

    /**
     * URL of the certificate file uploaded to Cloudinary.
     */
    @Column(name = "file_url", length = 500)
    private String fileUrl;

    // --------------------------------------------------
    // Certification Dates
    // --------------------------------------------------

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    // --------------------------------------------------
    // Audit
    // --------------------------------------------------

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // --------------------------------------------------
    // Course
    // --------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    // --------------------------------------------------
    // Assessment
    // --------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id")
    private Assessment assessment;

    // --------------------------------------------------
    // Automatically set creation time
    // --------------------------------------------------

    @PrePersist
    protected void prePersist() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}