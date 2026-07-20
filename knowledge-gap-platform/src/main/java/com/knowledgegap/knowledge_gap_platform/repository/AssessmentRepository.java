package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.Assessment;
import com.knowledgegap.knowledge_gap_platform.entity.Course;
import com.knowledgegap.knowledge_gap_platform.entity.Skill;
import com.knowledgegap.knowledge_gap_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    List<Assessment> findByUser(User user);

    List<Assessment> findByCourse(Course course);

    List<Assessment> findBySkill(Skill skill);
}