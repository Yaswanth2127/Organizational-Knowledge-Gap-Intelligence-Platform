package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.JobRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRoleRepository extends JpaRepository<JobRole,Long> {
    boolean existsByTitleAndDepartmentId(String title, Long departmentId);
    boolean existsByTitleAndDepartmentIdAndIdNot(
            String title,
            Long departmentId,
            Long id
    );
}
