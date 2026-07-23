package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.EmployeeSkill;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {
    @EntityGraph(attributePaths = {
            "user",
            "skill"
            ,"user.department"
            ,"user.jobRole"
    })
    List<EmployeeSkill> findByUserId(Long userId);

    @EntityGraph(attributePaths = {
            "user",
            "skill"
            ,"user.department"
            ,"user.jobRole"
    })
    Optional<EmployeeSkill> findByUserIdAndSkill(Long userId, Skill skill);

    @Override
    @EntityGraph(attributePaths = {
            "user",
            "skill"
            ,"user.department"
            ,"user.jobRole"
    })
    List<EmployeeSkill>findAll();

    @Override
    @EntityGraph(attributePaths = {
            "user",
            "skill"
            ,"user.department"
            ,"user.jobRole"
    })
    Optional<EmployeeSkill> findById(Long id);

}