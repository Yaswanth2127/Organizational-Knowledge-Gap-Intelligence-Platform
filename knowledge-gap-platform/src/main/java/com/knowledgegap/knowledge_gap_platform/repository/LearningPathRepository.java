package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {

    List<LearningPath> findByUser(User user);

    List<LearningPath> findByStatus(LearningPathStatus status);

}