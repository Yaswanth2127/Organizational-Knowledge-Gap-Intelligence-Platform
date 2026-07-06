package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CompetencyFrameworkResponse;

import java.util.List;

public interface CompetencyFrameworkService {
    CompetencyFrameworkResponse addCompetencyFramework(
            CompetencyFrameworkRequest competencyFrameworkRequest);

    List<CompetencyFrameworkResponse> getAllCompetencyFrameworks();

    CompetencyFrameworkResponse getCompetencyFrameworkById(Long id);

    CompetencyFrameworkResponse updateCompetencyFramework(
            Long id,
            CompetencyFrameworkRequest competencyFrameworkRequest);

    void deleteCompetencyFrameworkById(Long id);
}
