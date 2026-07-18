package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.DepartmentGapSummary;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.LocalDate;
import java.util.List;

public interface DepartmentGapSummaryRepository extends JpaRepository<DepartmentGapSummary,Long> {

    @Transactional
    @Modifying
    void deleteByDepartmentIdAndPeriodStartAndPeriodEnd
            (Long departmentId, LocalDate periodStart,LocalDate periodEnd);

    @EntityGraph(attributePaths = {"skill","department"})
    List<DepartmentGapSummary> findAllByDepartmentIdAndPeriodStartAndPeriodEnd(Long departmentId,
                                                                               LocalDate periodStart,LocalDate periodEnd);

}
