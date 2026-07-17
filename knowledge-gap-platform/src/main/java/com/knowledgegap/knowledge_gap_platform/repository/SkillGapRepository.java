package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.GapSeverity;
import com.knowledgegap.knowledge_gap_platform.entity.GapStatus;
import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillGapRepository extends JpaRepository<SkillGap,Long> {
    void deleteByUserId(Long userId);

    List<SkillGap> findAllByUserDepartmentId(Long departmentId);

    List<SkillGap> findAllByUserJobRoleId(Long jobRoleId);

    List<SkillGap> findAllByFrameworkId(Long frameworkId);

    List<SkillGap> findAllByStatus(GapStatus status);

    List<SkillGap> findAllBySeverity(GapSeverity severity);
}
