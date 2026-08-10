package com.knowledgegap.knowledge_gap_platform.service;

import com.knowledgegap.knowledge_gap_platform.dto.AdminCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeCertificationRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CertificationService {

    // =========================================================
    // EMPLOYEE CERTIFICATION
    // =========================================================

    CertificationResponse addMyCertification(
            EmployeeCertificationRequest request,
            MultipartFile file
    );

    List<CertificationResponse> getMyCertifications();

    CertificationResponse updateMyCertification(
            Long id,
            EmployeeCertificationRequest request,
            MultipartFile file
    );

    void deleteMyCertification(Long id);


    // =========================================================
    // ADMIN / HR CERTIFICATION
    // =========================================================

    CertificationResponse addCertification(
            AdminCertificationRequest request,
            MultipartFile file
    );

    List<CertificationResponse> getAllCertifications();

    CertificationResponse getCertificationById(Long id);

    CertificationResponse updateCertification(
            Long id,
            AdminCertificationRequest request,
            MultipartFile file
    );

    void deleteCertificationById(Long id);
}