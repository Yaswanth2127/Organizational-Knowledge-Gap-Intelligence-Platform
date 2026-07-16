package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningPathRepository extends JpaRepository<LearningPath,Long> {
}
