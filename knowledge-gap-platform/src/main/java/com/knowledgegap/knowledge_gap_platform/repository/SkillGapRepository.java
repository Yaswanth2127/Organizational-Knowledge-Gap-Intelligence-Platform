package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.GapStatus;
import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SkillGapRepository extends JpaRepository<SkillGap,Long> {
    void deleteByUserId(Long userId);

    @EntityGraph(attributePaths = {"user.department","skill"})
    List<SkillGap> findAllByUserDepartmentIdAndDetectedAtBetween(Long departmentId, LocalDateTime periodStart,

                                                                LocalDateTime periodEnd);

    @EntityGraph(attributePaths = {"user.department","skill"})
    List<SkillGap> findByUserId(Long userId);

    List<SkillGap> findAllByUserJobRoleId(Long jobRoleId);

    List<SkillGap> findAllByFrameworkId(Long frameworkId);

    List<SkillGap> findAllByStatus(GapStatus status);

    List<SkillGap> findAllBySeverity(GapSeverity severity);
}
