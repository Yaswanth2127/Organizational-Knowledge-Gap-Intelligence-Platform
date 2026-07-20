package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentRequest;
import com.knowledgegap.knowledge_gap_platform.dto.EnrollmentResponse;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponse enroll(EnrollmentRequest request);

    EnrollmentResponse update(Long id, EnrollmentRequest request);

    EnrollmentResponse getById(Long id);

    List<EnrollmentResponse> getAll();

    void delete(Long id);
}