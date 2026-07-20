package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByTitle(String title);

    boolean existsByTitle(String title);

    @EntityGraph(attributePaths = {"skill"})
    List<Course> findBySkill(Skill skill);

    @EntityGraph(attributePaths = {"skill"})
    List<Course> findByIsActiveTrue();

    @EntityGraph(attributePaths = {"skill"})
    List<Course> findBySkillAndIsActiveTrue(Skill skill);

    @Override
    @EntityGraph(attributePaths = {"skill"})
    Optional<Course> findById(Long id);

    @Override
    @EntityGraph(attributePaths = {"skill"})
    List<Course> findAll();
}