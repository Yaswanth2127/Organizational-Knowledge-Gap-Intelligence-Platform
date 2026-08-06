package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.dto.EmployeeCertificationRequest;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/certifications/me")
@CrossOrigin("*")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeCertificationController {
    private final CertificationService certificationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CertificationResponse> addMyCertification(
            @RequestPart("data") EmployeeCertificationRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        return ResponseEntity.ok(
                certificationService.addMyCertification(request, file)
        );
    }

    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getMyCertifications() {

        return ResponseEntity.ok(
                certificationService.getMyCertifications()
        );
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CertificationResponse> updateMyCertification(
            @PathVariable Long id,
            @RequestPart("data") EmployeeCertificationRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        return ResponseEntity.ok(
                certificationService.updateMyCertification(id, request, file)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMyCertification(@PathVariable Long id) {

        certificationService.deleteMyCertification(id);

        return ResponseEntity.noContent().build();
    }

}
