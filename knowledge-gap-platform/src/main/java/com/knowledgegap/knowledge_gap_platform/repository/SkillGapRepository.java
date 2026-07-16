package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.SkillGap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillGapRepository extends JpaRepository<SkillGap,Long> {
    void deleteByUserId(Long userId);
}
