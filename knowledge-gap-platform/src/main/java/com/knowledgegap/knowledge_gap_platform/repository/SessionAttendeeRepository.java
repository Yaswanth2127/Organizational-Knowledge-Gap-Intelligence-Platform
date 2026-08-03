package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.SessionAttendee;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionAttendeeRepository extends JpaRepository<SessionAttendee,Long> {
    @EntityGraph(attributePaths = {"session","user"})
    List<SessionAttendee> findBySession(KnowledgeSession session);

    @EntityGraph(attributePaths = {"session","user"})
    List<SessionAttendee> findByUser(User user);

    @Override
    @EntityGraph(attributePaths = {"session","user"})
    Optional<SessionAttendee> findById(Long aLong);

    @Override
    @EntityGraph(attributePaths = {"session","user"})
    List<SessionAttendee> findAll();
}
