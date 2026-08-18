package com.knowledgegap.knowledge_gap_platform.repository;

import com.knowledgegap.knowledge_gap_platform.entity.DepartmentGapSummary;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
            SELECT dgs
            FROM DepartmentGapSummary dgs
            JOIN FETCH dgs.department
            JOIN FETCH dgs.skill
            WHERE dgs.department.id = :departmentId
            ORDER BY dgs.periodEnd DESC
            """)
    List<DepartmentGapSummary> findDepartmentReport(
            @Param("departmentId") Long departmentId
    );

}
