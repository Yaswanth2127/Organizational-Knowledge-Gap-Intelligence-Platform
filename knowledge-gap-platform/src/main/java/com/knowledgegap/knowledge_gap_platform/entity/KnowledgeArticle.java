package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "knowledge_articles")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KnowledgeArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id",nullable = false)
    private User author;

    @Column(name = "title",nullable = false,length = 200)
    private String title;


    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="skill_id")
    private Skill skill;

    @Column(name = "resource_url",length = 500)
    private String  resourceUrl;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;


    @PrePersist
    public void onCreate(){
        LocalDateTime now=LocalDateTime.now();
        if(createdAt==null)createdAt=now;
        if(updatedAt==null)updatedAt=now;
    }

    @PreUpdate
    public void onUpdate(){
        updatedAt=LocalDateTime.now();
    }
}
