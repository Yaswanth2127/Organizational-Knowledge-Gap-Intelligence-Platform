package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.report.AssessmentReportDTO;
import com.knowledgegap.knowledge_gap_platform.dto.report.DepartmentGapReportDTO;
import com.knowledgegap.knowledge_gap_platform.dto.report.EmployeeSkillGapReportDTO;
import com.knowledgegap.knowledge_gap_platform.dto.report.LearningRecommendationReportDTO;

import java.util.List;

public interface ReportService {

    List<EmployeeSkillGapReportDTO> getEmployeeSkillGapReport(
            Long userId
    );

    List<AssessmentReportDTO> getEmployeeAssessmentReport(
            Long userId
    );

    List<DepartmentGapReportDTO> getDepartmentGapReport(
            Long departmentId
    );

    List<LearningRecommendationReportDTO> getLearningRecommendationReport(
            Long userId
    );
}