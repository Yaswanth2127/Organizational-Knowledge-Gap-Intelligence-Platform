package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentGapSummaryResponse;
import com.knowledgegap.knowledge_gap_platform.service.DepartmentGapSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/department-gap-summary")
public class DepartmentGapSummaryController {
    private final DepartmentGapSummaryService departmentGapSummaryService;


    @GetMapping("/departments/{departmentId}/summary/current")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST','DEPARTMENT_MANAGER')")
    public ResponseEntity<List<DepartmentGapSummaryResponse>> getDepartmentGapSummary(
            @PathVariable("departmentId") Long deptId) {

        List<DepartmentGapSummaryResponse> response =
                departmentGapSummaryService.analyzeCurrentMonthSummaryUsingDeptId(deptId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/departments/{departmentId}/summary/history")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST','DEPARTMENT_MANAGER')")
    public ResponseEntity<List<DepartmentGapSummaryResponse>> getHistoricalSummary(
            @PathVariable Long departmentId,
            @RequestParam LocalDate periodStart) {

        List<DepartmentGapSummaryResponse> response =
                departmentGapSummaryService.getHistoricalDepartmentGapSummary(
                        departmentId,
                        periodStart
                );

        return ResponseEntity.ok(response);
    }
}
