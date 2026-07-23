package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AnswerOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "employee_answers")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmployeeAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "assessment_id",nullable = false)
    @ManyToOne(fetch =FetchType.LAZY)
    private Assessment assessment;


    @JoinColumn(name = "question_id",nullable = false)
    @OneToOne(fetch = FetchType.LAZY)
    private Question question;


    @Column(nullable = false)
    private AnswerOption selectedAnswer;


    @Column(nullable = false)
    private  Boolean correct;


}
