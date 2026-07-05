package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill,Long> {
    boolean existsByName(String name);
    boolean existsByNameAndSkillCategoryId(String name, Long skillCategoryId);
    boolean existsByNameAndSkillCategoryIdAndIdNot(String name,Long skillCategoryId,Long id);
}
