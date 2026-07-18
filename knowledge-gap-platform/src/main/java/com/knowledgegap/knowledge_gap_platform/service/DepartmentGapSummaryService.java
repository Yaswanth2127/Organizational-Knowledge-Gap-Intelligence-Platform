package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.DepartmentGapSummaryResponse;

import java.time.LocalDate;
import java.util.List;

public interface DepartmentGapSummaryService {
    List<DepartmentGapSummaryResponse> analyzeCurrentMonthSummaryUsingDeptId(Long deptId);
    List<DepartmentGapSummaryResponse> getHistoricalDepartmentGapSummary(Long deptId,LocalDate periodStart);

}
