package com.knowledgegap.knowledge_gap_platform.service;

import org.springframework.web.multipart.MultipartFile;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;

import java.util.List;

public interface CertificationService {

    CertificationResponse addCertification(
            CertificationRequest request,
            MultipartFile file
    );

    List<CertificationResponse> getAllCertifications();

    CertificationResponse getCertificationById(Long id);

    CertificationResponse updateCertification(
            Long id,
            CertificationRequest request,
            MultipartFile file
    );

    void deleteCertificationById(Long id);
}