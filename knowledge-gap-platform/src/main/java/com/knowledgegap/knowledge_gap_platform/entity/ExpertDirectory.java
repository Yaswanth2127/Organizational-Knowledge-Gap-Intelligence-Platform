package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.ProficiencyLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "expert_directory", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skill_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpertDirectory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" ,nullable = false)
    private  User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id",nullable = false)
    private  Skill skill;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "expertise_level" ,nullable = false)
    private ProficiencyLevel expertiseLevel;


    @Builder.Default
    @Column(name = "endorsement_count",nullable = false)
    private Integer endorsementCount=0;

    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    public void  onCreatedAt(){
        if(createdAt==null){
            createdAt=LocalDateTime.now();
        }
    }

}
