package com.knowledgegap.knowledge_gap_platform.entity;

import com.knowledgegap.knowledge_gap_platform.entity.enums.AnswerOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Table(name = "questions")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "assessment_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Assessment assessment;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(nullable = false)
    private String optionA;

    @Column(nullable = false)
    private String optionB;

    @Column(nullable = false)
    private String optionC;

    @Column(nullable = false)
    private String optionD;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    private AnswerOption correctAnswer;

    @Column(nullable = false)
    private Integer questionOrder;

}
