package com.knowledgegap.knowledge_gap_platform.controller;

import com.knowledgegap.knowledge_gap_platform.dto.CertificationRequest;
import com.knowledgegap.knowledge_gap_platform.dto.CertificationResponse;
import com.knowledgegap.knowledge_gap_platform.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CertificationController {
    private final CertificationService certificationService;

    @PostMapping("/add")
    public ResponseEntity<CertificationResponse> addCertification(
            @RequestBody CertificationRequest certificationRequest) {

        return ResponseEntity.ok(
                certificationService.addCertification(certificationRequest)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<CertificationResponse>> getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificationResponse> update(
            @PathVariable Long id,
            @RequestBody CertificationRequest certificationRequest) {

        return ResponseEntity.ok(
                certificationService.updateCertification(id, certificationRequest)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        certificationService.deleteCertificationById(id);
        return ResponseEntity.noContent().build();
    }
}
