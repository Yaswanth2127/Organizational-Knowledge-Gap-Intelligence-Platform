package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.SessionAttendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionAttendeeRepository extends JpaRepository<SessionAttendee,Long> {
}
