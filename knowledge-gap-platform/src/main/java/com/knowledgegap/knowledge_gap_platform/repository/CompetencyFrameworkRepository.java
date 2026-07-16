package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.CompetencyFramework;
import com.knowledgegap.knowledge_gap_platform.entity.JobRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompetencyFrameworkRepository extends JpaRepository<CompetencyFramework,Long> {
    boolean existsByJobRoleId(Long jobRoleId);

    boolean existsByJobRoleIdAndIdNot(Long jobRoleId, Long id);


    Optional<CompetencyFramework> findByJobRole(JobRole jobRole);
}
