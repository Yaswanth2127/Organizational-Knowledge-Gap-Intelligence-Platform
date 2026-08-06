package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPathCourse;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LearningPathCourseRepository extends JpaRepository<LearningPathCourse, Long> {
    @Override
    @EntityGraph(attributePaths = {"course", "learningPath"})
    List<LearningPathCourse> findAll();

    @EntityGraph(attributePaths = {"course", "learningPath"})
    List<LearningPathCourse> findByLearningPath(LearningPath learningPath);

    @EntityGraph(attributePaths = {"course", "learningPath"})
    Optional<LearningPathCourse> findByLearningPathAndSequenceOrder(
            LearningPath learningPath,
            Integer sequenceOrder
    );
}