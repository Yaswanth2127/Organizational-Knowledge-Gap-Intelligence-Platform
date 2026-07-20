package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.LearningPathCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LearningPathCourseRepository extends JpaRepository<LearningPathCourse, Long> {

    List<LearningPathCourse> findByLearningPath(LearningPath learningPath);

    Optional<LearningPathCourse> findByLearningPathAndSequenceOrder(
            LearningPath learningPath,
            Integer sequenceOrder
    );
}