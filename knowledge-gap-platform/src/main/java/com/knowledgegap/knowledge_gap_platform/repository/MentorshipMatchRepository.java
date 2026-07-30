package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.MentorshipMatch;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface MentorshipMatchRepository extends JpaRepository<MentorshipMatch,Long> {
    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    Optional<MentorshipMatch> findById(Long aLong);

    @EntityGraph(attributePaths = {"user","skill"})
    Optional<MentorshipMatch> findByMentorIdAndMenteeIdAndSkillId(
            Long mentorId,
            Long menteeId,
            Long skillId
    );

    @EntityGraph(attributePaths = {"user","skill"})
    List<MentorshipMatch> findByMentorId(Long mentorId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<MentorshipMatch> findByMenteeId(Long menteeId);

    @EntityGraph(attributePaths = {"user","skill"})
    List<MentorshipMatch> findByStatus(MentorshipStatus status);

    @EntityGraph(attributePaths = {"user","skill"})
    List<MentorshipMatch> findBySkillId(Long skillId);
}
