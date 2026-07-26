package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.*;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SkillGapRepository extends JpaRepository<SkillGap,Long> {
    void deleteByUserId(Long userId);

    @EntityGraph(attributePaths = {"user.department","skill"})
    List<SkillGap> findAllByUserDepartmentIdAndDetectedAtBetween(Long departmentId, LocalDateTime periodStart,

                                                                LocalDateTime periodEnd);

    @EntityGraph(attributePaths = {"user.department","skill","user"})
    List<SkillGap> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"skill"})
    Optional<SkillGap> findByUserAndSkill(User user, Skill skill);

    @EntityGraph(attributePaths = {"user","skill","framework"})
    List<SkillGap> findByUserIdAndStatus(Long userId,GapStatus status);

    List<SkillGap> findAllByUserJobRoleId(Long jobRoleId);

    List<SkillGap> findAllByFrameworkId(Long frameworkId);

    List<SkillGap> findAllByStatus(GapStatus status);

    List<SkillGap> findAllBySeverity(GapSeverity severity);
}
