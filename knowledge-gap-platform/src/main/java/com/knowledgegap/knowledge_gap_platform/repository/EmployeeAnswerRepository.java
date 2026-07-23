package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.EmployeeAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAnswerRepository extends JpaRepository<EmployeeAnswer,Long> {
    Boolean existsByAssessmentId(Long assessmentId);
}
