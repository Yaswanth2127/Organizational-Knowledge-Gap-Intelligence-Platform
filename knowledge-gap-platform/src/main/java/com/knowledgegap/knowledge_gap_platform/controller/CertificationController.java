package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.AdminCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@RequiredArgsConstructor
@CrossOrigin("*")
@PreAuthorize("hasAnyRole('SYS_ADMIN', 'HR_SPECIALIST')")
public class CertificationController {

    private final CertificationService certificationService;

    /**
     * Add Certification
     * Supports optional certificate file upload.
     */
    @PostMapping(
            value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<CertificationResponse> addCertification(

            @RequestPart("data")
            AdminCertificationRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        CertificationResponse response =
                certificationService.addCertification(request, file);

        return ResponseEntity.ok(response);
    }

    /**
     * Get all certifications.
     */
    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    /**
     * Get certification by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponse> getCertificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }

    /**
     * Update certification.
     * File is optional, so the existing file URL can be retained
     * when no new file is uploaded.
     */
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<CertificationResponse> updateCertification(

            @PathVariable Long id,

            @RequestPart("data")
            AdminCertificationRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        CertificationResponse response =
                certificationService.updateCertification(
                        id,
                        request,
                        file
                );

        return ResponseEntity.ok(response);
    }

    /**
     * Delete certification by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(
            @PathVariable Long id) {

        certificationService.deleteCertificationById(id);

        return ResponseEntity.noContent().build();
    }
}