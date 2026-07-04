package com.knowledgegap.knowledge_gap_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill_categories")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SkillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true,length = 100)
    private  String name;
}
