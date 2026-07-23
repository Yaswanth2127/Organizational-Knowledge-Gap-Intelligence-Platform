package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.LearningPath;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {

    @EntityGraph(attributePaths = {"user"})
    List<LearningPath> findByUserIdOrderByCreatedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"user"})
    Optional<LearningPath> findByUserIdAndStatus(Long userId, LearningPathStatus status);


    @EntityGraph(attributePaths = {"user"})
    List<LearningPath> findByStatus(LearningPathStatus status);

    @Modifying
    @Query("""
    UPDATE LearningPath lp
    SET lp.status = com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus.ARCHIVED
    WHERE lp.user.id = :userId
      AND lp.status = com.knowledgegap.knowledge_gap_platform.entity.enums.LearningPathStatus.ACTIVE
""")
    void archiveActiveLearningPathsByUserId(@Param("userId") Long userId);

}