package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KnowledgeSessionRepository extends JpaRepository<KnowledgeSession,Long> {

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    Optional<KnowledgeSession> findById(Long aLong);

    @EntityGraph(attributePaths = {"user","skill"})
    List<KnowledgeSession> findByHostId(Long hostId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<KnowledgeSession> findByTopicSkillId(Long skillId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<KnowledgeSession> findByStatus(SessionStatus status);

    @EntityGraph(attributePaths = {"user","skill"})
    List<KnowledgeSession> findByHostIdAndStatus(
            Long hostId,
            SessionStatus status
    );

    boolean existsByHostIdAndTopicSkillIdAndTitle(Long hostId,Long topicSkillId,String title);
}
