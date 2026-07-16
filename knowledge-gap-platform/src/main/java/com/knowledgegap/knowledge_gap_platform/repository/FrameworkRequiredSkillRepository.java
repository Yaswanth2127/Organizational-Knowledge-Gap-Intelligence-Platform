package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.CompetencyFramework;
import com.knowledgegap.knowledge_gap_platform.entity.FrameworkRequiredSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FrameworkRequiredSkillRepository extends JpaRepository<FrameworkRequiredSkill, Long> {

    boolean existsByFrameworkIdAndSkillId(Long frameworkId, Long skillId);

    boolean existsByFrameworkIdAndSkillIdAndIdNot(
            Long frameworkId,
            Long skillId,
            Long id
    );

    List<FrameworkRequiredSkill> findByFramework(CompetencyFramework framework);
}
