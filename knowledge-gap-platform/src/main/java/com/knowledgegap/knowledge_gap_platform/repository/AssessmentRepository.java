package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    @EntityGraph(attributePaths = {"user", "skill"})
    List<Assessment> findByUser(User user);

    @Override
    @EntityGraph(attributePaths = {"user", "skill"})
    Optional<Assessment> findById(Long id);

    @EntityGraph(attributePaths = {"user", "skill"})
    List<Assessment> findBySkill(Skill skill);

    @Override
    @EntityGraph(attributePaths = {"user", "skill"})
    List<Assessment> findAll();

    @EntityGraph(attributePaths = {"user", "skill"})
    List<Assessment> findByStatus(AssessmentStatus status);

    @EntityGraph(attributePaths = {"user", "skill"})
    List<Assessment> findByStatusIn(List<AssessmentStatus> statuses);

    boolean existsByUserAndSkillAndStatus(
            User user,
            Skill skill,
            AssessmentStatus status
    );

    Integer countCompletedByUserId(Long userId);

    // ==========================================
    // ANALYTICS
    // ==========================================

    long countByStatusIn(List<AssessmentStatus> statuses);

    @Query("""
            SELECT a
            FROM Assessment a
            JOIN FETCH a.skill
            WHERE a.user.id = :userId
            ORDER BY a.assessedAt DESC
            """)
    List<Assessment> findAssessmentsForReport(
            @Param("userId") Long userId
    );
}