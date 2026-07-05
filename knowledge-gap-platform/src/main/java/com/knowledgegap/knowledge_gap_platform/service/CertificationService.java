package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;

import java.util.List;

public interface CertificationService {
    CertificationResponse addCertification(CertificationRequest certificationRequest);
    List<CertificationResponse> getAllCertifications();
    CertificationResponse getCertificationById(Long id);
    CertificationResponse updateCertification(Long id, CertificationRequest certificationRequest);
    void deleteCertificationById(Long id);
}
