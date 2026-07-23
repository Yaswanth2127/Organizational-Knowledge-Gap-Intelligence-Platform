package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Question;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    @EntityGraph(attributePaths = {"assessment"})
    List<Question>findByAssessmentIdOrderByQuestionOrder(Long assessmentId);

    @Override
    @EntityGraph(attributePaths = {"assessment"})
    Optional<Question> findById(Long aLong);
}
