package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface KnowledgeSessionRepository
        extends JpaRepository<KnowledgeSession, Long> {

    // =====================================================
    // GET BY ID
    // =====================================================

    @Override
    @EntityGraph(attributePaths = {"host", "topicSkill"})
    Optional<KnowledgeSession> findById(Long id);


    // =====================================================
    // GET BY HOST
    // =====================================================

    @EntityGraph(attributePaths = {"host", "topicSkill"})
    List<KnowledgeSession> findByHostId(Long hostId);


    // =====================================================
    // GET BY SKILL
    // =====================================================

    @EntityGraph(attributePaths = {"host", "topicSkill"})
    List<KnowledgeSession> findByTopicSkillId(Long skillId);


    // =====================================================
    // GET BY STATUS
    // =====================================================

    @EntityGraph(attributePaths = {"host", "topicSkill"})
    List<KnowledgeSession> findByStatus(SessionStatus status);


    // =====================================================
    // GET BY HOST + STATUS
    // =====================================================

    @EntityGraph(attributePaths = {"host", "topicSkill"})
    List<KnowledgeSession> findByHostIdAndStatus(
            Long hostId,
            SessionStatus status
    );


    // =====================================================
    // SCHEDULER
    // =====================================================

    // SCHEDULED -> ONGOING
    List<KnowledgeSession> findByStatusAndScheduledAtLessThanEqual(
            SessionStatus status,
            LocalDateTime scheduledAt
    );


    // ONGOING -> COMPLETED
    List<KnowledgeSession> findByStatusAndEndedAtLessThanEqual(
            SessionStatus status,
            LocalDateTime endedAt
    );


    // =====================================================
    // ANALYTICS
    // =====================================================

    @Query("""
    SELECT COUNT(k)
    FROM KnowledgeSession k
    WHERE k.status = :status
    AND k.scheduledAt >= :dateTime
    """)
    long countUpcomingSessions(
        @Param("status") SessionStatus status,
        @Param("dateTime") LocalDateTime dateTime
    );
}