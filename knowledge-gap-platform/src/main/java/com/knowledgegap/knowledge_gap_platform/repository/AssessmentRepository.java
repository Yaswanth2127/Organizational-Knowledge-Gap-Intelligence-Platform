package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import com.knowledgegap.knowledge_gap_platform.entity.enums.AssessmentStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    @EntityGraph(attributePaths = {"user","skill"})
    List<Assessment> findByUser(User user);

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    Optional<Assessment> findById(Long aLong);

    @EntityGraph(attributePaths = {"user","skill"})
    List<Assessment> findBySkill(Skill skill);

    @Override
    @EntityGraph(attributePaths = {"user","skill"})
    List<Assessment> findAll();

    @EntityGraph(attributePaths = {"user","skill"})
    List<Assessment> findByStatus(AssessmentStatus status);

    @EntityGraph(attributePaths = {"user","skill"})
    List<Assessment> findByStatusIn(List<AssessmentStatus> statuses);

    boolean existsByUserAndSkillAndStatus(
            User user,
            Skill skill,
            AssessmentStatus status
            );
}