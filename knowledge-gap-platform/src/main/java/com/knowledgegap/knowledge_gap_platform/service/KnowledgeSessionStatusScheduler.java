package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.entity.KnowledgeSession;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KnowledgeSessionStatusScheduler {

    private final KnowledgeSessionRepository knowledgeSessionRepository;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void updateSessionStatuses() {

        LocalDateTime now = LocalDateTime.now();

        // SCHEDULED → ONGOING
        List<KnowledgeSession> sessionsToStart =
                knowledgeSessionRepository
                        .findByStatusAndScheduledAtLessThanEqual(
                                SessionStatus.SCHEDULED,
                                now
                        );

        for (KnowledgeSession session : sessionsToStart) {
            session.setStatus(SessionStatus.ONGOING);
        }

        // ONGOING → COMPLETED
        List<KnowledgeSession> sessionsToComplete =
                knowledgeSessionRepository
                        .findByStatusAndEndedAtLessThanEqual(
                                SessionStatus.ONGOING,
                                now
                        );

        for (KnowledgeSession session : sessionsToComplete) {
            session.setStatus(SessionStatus.COMPLETED);
        }

        // Save only if something changed
        if (!sessionsToStart.isEmpty()) {
            knowledgeSessionRepository.saveAll(sessionsToStart);
        }

        if (!sessionsToComplete.isEmpty()) {
            knowledgeSessionRepository.saveAll(sessionsToComplete);
        }
    }
}