package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationRequest;
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
@PreAuthorize("hasAnyRole('SYS_ADMIN','HR_SPECIALIST')")
public class CertificationController {

    private final CertificationService certificationService;

    // Upload Certification
    @PostMapping(
            value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<CertificationResponse> addCertification(

            @RequestPart("data")
            CertificationRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        return ResponseEntity.ok(
                certificationService.addCertification(request, file)
        );
    }

    // Get All Certifications
    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    // Get Certification By Id
    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }

    // Update Certification
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<CertificationResponse> update(

            @PathVariable Long id,

            @RequestPart("data")
            CertificationRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        return ResponseEntity.ok(
                certificationService.updateCertification(
                        id,
                        request,
                        file
                )
        );
    }

    // Delete Certification
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        certificationService.deleteCertificationById(id);

        return ResponseEntity.noContent().build();
    }
}