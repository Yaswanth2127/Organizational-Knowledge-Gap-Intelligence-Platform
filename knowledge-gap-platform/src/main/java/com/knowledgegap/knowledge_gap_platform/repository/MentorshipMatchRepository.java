package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.MentorshipMatch;
import com.knowledgegap.knowledge_gap_platform.entity.enums.MentorshipStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface MentorshipMatchRepository extends JpaRepository<MentorshipMatch,Long> {
    @Override
    @EntityGraph(attributePaths = {"mentor","mentee","skill"})
    Optional<MentorshipMatch> findById(Long aLong);

    @EntityGraph(attributePaths = {"mentor", "mentee", "skill"})
    List<MentorshipMatch>
    findByMentorIdAndMenteeIdAndSkillIdAndStatusIn(
            Long mentorId,
            Long menteeId,
            Long skillId,
            List<MentorshipStatus> statuses
    );

    @EntityGraph(attributePaths = {"mentor","mentee","skill"})
    List<MentorshipMatch> findByMentorId(Long mentorId);

    @EntityGraph(attributePaths = {"mentor","mentee","skill"})
    List<MentorshipMatch> findByMenteeId(Long menteeId);

    @EntityGraph(attributePaths = {"mentor","mentee","skill"})
    List<MentorshipMatch> findByStatus(MentorshipStatus status);

    @EntityGraph(attributePaths = {"mentor","mentee","skill"})
    List<MentorshipMatch> findBySkillId(Long skillId);
}
