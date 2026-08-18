package com.knowledgegap.knowledge_gap_platform.service.imp;

import com.knowledgegap.knowledge_gap_platform.dto.AnalyticsOverviewResponse;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.enums.SessionStatus;
import com.knowledgegap.knowledge_gap_platform.repository.AssessmentRepository;
import com.knowledgegap.knowledge_gap_platform.repository.KnowledgeSessionRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillGapRepository;
import com.knowledgegap.knowledge_gap_platform.repository.SkillRepository;
import com.knowledgegap.knowledge_gap_platform.repository.UserRepository;
import com.knowledgegap.knowledge_gap_platform.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final AssessmentRepository assessmentRepository;
    private final SkillGapRepository skillGapRepository;
    private final KnowledgeSessionRepository knowledgeSessionRepository;

    @Override
    public AnalyticsOverviewResponse getOverview() {

        // Current time
        LocalDateTime now = LocalDateTime.now();

        // ==============================
        // BASIC COUNTS
        // ==============================

        long totalEmployees =
                userRepository.count();

        long totalSkills =
                skillRepository.count();

        long totalAssessments =
                assessmentRepository.count();

        long totalSkillGaps =
                skillGapRepository.count();

        long totalKnowledgeSessions =
                knowledgeSessionRepository.count();


        // ==============================
        // COMPLETED ASSESSMENTS
        // ==============================

        long completedAssessments =
                assessmentRepository.countByStatusIn(
                        java.util.List.of(
                                AssessmentStatus.PASSED,
                                AssessmentStatus.FAILED,
                                AssessmentStatus.APPROVED
                        )
                );


        // ==============================
        // CRITICAL SKILL GAPS
        // ==============================

        long criticalGaps =
                skillGapRepository.countBySeverity(
                        GapSeverity.CRITICAL
                );


        // ==============================
        // UPCOMING KNOWLEDGE SESSIONS
        // ==============================

        long upcomingKnowledgeSessions =
                knowledgeSessionRepository.countUpcomingSessions(
                        SessionStatus.SCHEDULED,
                        now
                );


        // ==============================
        // RESPONSE
        // ==============================

        return AnalyticsOverviewResponse.builder()

                .totalEmployees(totalEmployees)

                .totalSkills(totalSkills)

                .totalAssessments(totalAssessments)

                .completedAssessments(completedAssessments)

                .totalSkillGaps(totalSkillGaps)

                .criticalGaps(criticalGaps)

                .totalKnowledgeSessions(totalKnowledgeSessions)

                .upcomingKnowledgeSessions(upcomingKnowledgeSessions)

                .build();
    }
}